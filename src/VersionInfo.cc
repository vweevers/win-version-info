#define NAPI_VERSION 3

#include <napi-macros.h>
#include <node_api.h>
#include <utf8conv.h>
#include <sstream>
#include "showver.h"

using namespace std;
using namespace utf8util;

napi_value getInfo (napi_env env, napi_callback_info info) {
  NAPI_ARGV(1);

  size_t size = 0;
  if ((napi_get_value_string_utf8(env, argv[0], 0, 0, &size)) != napi_ok) {
    napi_throw_error(env, 0, "win-version-info requires a string filename");
    return NULL;
  }

  char* file = new char[size + 1];
  NAPI_STATUS_THROWS(napi_get_value_string_utf8(env, argv[0], file, size + 1, &size));
  file[size] = '\0';

  napi_value metadata;
  NAPI_STATUS_THROWS(napi_create_object(env, &metadata));
  bool success = false;

  try {
    wstring utf16 = UTF16FromUTF8(file);
    success = GetMetadata(&utf16[0], env, metadata);
  } catch (const utf8_conversion_error & e) {
    ostringstream msg;
    msg << "UTF-8 conversion error (" << e.error_code() << "): " << e.what();
    delete [] file;
    napi_throw_error(env, NULL, msg.str().c_str());
    return NULL;
  } catch(const exception & e) {
    delete [] file;
    napi_throw_error(env, NULL, e.what());
    return NULL;
  }

  if (!success) {
    string msg = "win-version-info is unable to access file: ";
    msg.append(file);
    delete [] file;
    napi_throw_error(env, NULL, msg.c_str());
    return NULL;
  }

  delete [] file;
  return metadata;
}

NAPI_INIT() {
  NAPI_EXPORT_FUNCTION(getInfo);
}
