/*
 * Original work: ShowVer 1.0, 2002-06-04
 * Copyright (c) 2002 Ted Peck <tpeck@roundwave.com>
 * Permission is given by the author to freely redistribute and include
 * this code in any program as long as this credit is given where due.
 *
 * THIS CODE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTY
 * OF ANY KIND, EITHER EXPRESSED OR IMPLIED. IN PARTICULAR, NO WARRANTY IS MADE
 * THAT THE CODE IS FREE OF DEFECTS, MERCHANTABLE, FIT FOR A PARTICULAR PURPOSE
 * OR NON-INFRINGING. IN NO EVENT WILL THE AUTHOR BE LIABLE FOR ANY COSTS OR DAMAGES
 * ARISING FROM ANY USE OF THIS CODE. NO USE OF THIS CODE IS AUTHORIZED EXCEPT UNDER
 * THIS DISCLAIMER.
 */
// ----------------------------------------------------------------------------

#include <malloc.h>
#include <sstream>
#include <node_api.h>
#include <utf8conv.h>

#include <algorithm>
#include <functional>
#include <cctype>
#include <locale>

#define WIN32_LEAN_AND_MEAN		// Exclude rarely-used stuff from Windows headers
#include <windows.h>

typedef unsigned char byte;

#ifndef _DEBUG
#   define ASSERT(s)
#else
#   include <CRTDbg.h>	// for _ASSERTE()
#   define ASSERT _ASSERTE
#endif

using namespace utf8util;

// ----------------------------------------------------------------------------

struct VS_VERSIONINFO {
  WORD  wLength;
  WORD  wValueLength;
  WORD  wType;
  WCHAR szKey[1];
  WORD  Padding1[1];
  VS_FIXEDFILEINFO Value;
  WORD  Padding2[1];
  WORD  Children[1];
};

struct String {
  WORD   wLength;
  WORD   wValueLength;
  WORD   wType;
  WCHAR  szKey[1];
  WORD   Padding[1];
  WORD   Value[1];
};

struct StringTable {
  WORD   wLength;
  WORD   wValueLength;
  WORD   wType;
  WCHAR  szKey[1];
  WORD   Padding[1];
  String Children[1];
};

struct StringFileInfo {
  WORD        wLength;
  WORD        wValueLength;
  WORD        wType;
  WCHAR       szKey[1];
  WORD        Padding[1];
  StringTable Children[1];
};

struct Var {
  WORD  wLength;
  WORD  wValueLength;
  WORD  wType;
  WCHAR szKey[1];
  WORD  Padding[1];
  DWORD Value[1];
};

struct VarFileInfo {
  WORD  wLength;
  WORD  wValueLength;
  WORD  wType;
  WCHAR szKey[1];
  WORD  Padding[1];
  Var   Children[1];
};

// ----------------------------------------------------------------------------

static inline bool isVersionKey(std::string &k) {
	return k == "FileVersion" || k == "ProductVersion";
}

static inline bool isEmptyVersion(std::string &v) {
	return v == "0.0.0.0" || v == "0.0.0" || v == "0.0" || v == "0";
}

// http://stackoverflow.com/a/217605 ------------------------------------------

static inline void ltrim(std::string &s) {
  s.erase(s.begin(), std::find_if(s.begin(), s.end(), [](unsigned char ch) {
		return !std::isspace(ch);
	}));
}

static inline void rtrim(std::string &s) {
  s.erase(std::find_if(s.rbegin(), s.rend(), [](unsigned char ch) {
    return !std::isspace(ch);
	}).base(), s.end());
}

static inline void trim(std::string &s) {
  ltrim(s);
  rtrim(s);
}

// ----------------------------------------------------------------------------

void ReadFixedFileInfo(VS_FIXEDFILEINFO* pValue, napi_env env, napi_value metadata) {
	// major.minor.patch.revision
	std::ostringstream v;
	v << (pValue->dwFileVersionMS >> 16) << ".";
	v << (pValue->dwFileVersionMS & 0xFFFF) << ".";
	v << (pValue->dwFileVersionLS >> 16) << ".";
	v << (pValue->dwFileVersionLS & 0xFFFF);

	std::string version = v.str();

	if (version != "0.0.0.0") {
		napi_value value;
		napi_create_string_utf8(env, version.data(), version.size(), &value);
		napi_set_named_property(env, metadata, "FileVersion", value);
	}
}

void SetUTF16Pair(wchar_t *key, wchar_t *value, napi_env env, napi_value metadata) {
  std::string utf8Key = UTF8FromUTF16(key);
  std::string utf8Val = UTF8FromUTF16(value);

	trim(utf8Val);

	if (utf8Val == "") return;
	if (isVersionKey(utf8Key) && isEmptyVersion(utf8Val)) return;

	napi_value k, v;
	napi_create_string_utf8(env, utf8Key.data(), utf8Key.size(), &k);
	napi_create_string_utf8(env, utf8Val.data(), utf8Val.size(), &v);
	napi_set_property(env, metadata, k, v);
}

void ReadFileInfo(void* pVer, DWORD size, napi_env env, napi_value metadata) {
	// Interpret the VS_VERSIONINFO header pseudo-struct
	VS_VERSIONINFO* pVS = (VS_VERSIONINFO*)pVer;
#define roundoffs(a,b,r)	(((byte*)(b) - (byte*)(a) + ((r)-1)) & ~((r)-1))
#define roundpos(b, a, r)	(((byte*)(a))+roundoffs(a,b,r))

	ASSERT(!wcscmp(pVS->szKey, L"VS_VERSION_INFO"));

	byte* pVt = (byte*) &pVS->szKey[wcslen(pVS->szKey)+1];
	VS_FIXEDFILEINFO* pValue = (VS_FIXEDFILEINFO*) roundpos(pVt, pVS, 4);
	if (pVS->wValueLength) ReadFixedFileInfo(pValue, env, metadata);

	// Iterate the children of VS_VERSIONINFO (either StringFileInfo or VarFileInfo)
	StringFileInfo* pSFI = (StringFileInfo*) roundpos(((byte*)pValue) + pVS->wValueLength, pValue, 4);

	for (; ((byte*) pSFI) < (((byte*) pVS) + pVS->wLength);
				 pSFI = (StringFileInfo*)roundpos((((byte*) pSFI) + pSFI->wLength), pSFI, 4)) { // StringFileInfo / VarFileInfo

		if (!wcscmp(pSFI->szKey, L"StringFileInfo")) {
			// The current child is a StringFileInfo element
			ASSERT(!pSFI->wValueLength);

			// Iterate the StringTable elements of StringFileInfo
			StringTable* pST = (StringTable*) roundpos(&pSFI->szKey[wcslen(pSFI->szKey)+1], pSFI, 4);

			for (; ((byte*) pST) < (((byte*) pSFI) + pSFI->wLength);
			       pST = (StringTable*)roundpos((((byte*) pST) + pST->wLength), pST, 4)) {

				ASSERT(!pST->wValueLength);

				// Iterate the String elements of StringTable
				String* pS = (String*) roundpos(&pST->szKey[wcslen(pST->szKey)+1], pST, 4);

				for (; ((byte*) pS) < (((byte*) pST) + pST->wLength);
				     pS = (String*) roundpos((((byte*) pS) + pS->wLength), pS, 4)) {

					wchar_t* psVal = (wchar_t*) roundpos(&pS->szKey[wcslen(pS->szKey)+1], pS, 4);

          if (pS->wValueLength > 0) {
						// printf("  %-18Sx: %.*S\n", pS->szKey, pS->wValueLength, psVal);
						SetUTF16Pair(pS->szKey, psVal, env, metadata);
					}
				}
			}
		}
	}

	ASSERT((byte*) pSFI == roundpos((((byte*) pVS) + pVS->wLength), pVS, 4));
}

// ----------------------------------------------------------------------------

bool GetMetadata(wchar_t *sfnFile, napi_env env, napi_value metadata) {
	DWORD dummy;
	DWORD size = GetFileVersionInfoSizeW(sfnFile, &dummy);
	if (!size) return false;

  void* pVer = _malloca(size);
  memset(pVer, 0, size);

	if (0 == GetFileVersionInfoW(sfnFile, 0, size, pVer)) {
    _freea(pVer);
    return false;
  }

	ReadFileInfo(pVer, size, env, metadata);
  _freea(pVer);

  return true;
}
