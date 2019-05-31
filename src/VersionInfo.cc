#include <nan.h>
#include <utf8conv.h>
#include <sstream>
#include "showver.h"

using namespace std;
using namespace utf8util;

NAN_METHOD(getInfo) {
  if (!info[0]->IsString()) {
    return Nan::ThrowError("win-version-info requires a string filename");
  }

  v8::Local<v8::Object> metadata = Nan::New<v8::Object>();
  Nan::Utf8String file(info[0]);

  bool success = false;

  try {
    wstring utf16 = UTF16FromUTF8(*file);
    success = GetMetadata(&utf16[0], metadata);
  } catch (const utf8_conversion_error & e) {
    ostringstream msg;
    msg << "UTF-8 conversion error (" << e.error_code() << "): " << e.what();
    return Nan::ThrowError(Nan::New(msg.str()).ToLocalChecked());
  } catch(const exception & e) {
    return Nan::ThrowError(e.what());
  }

  if (!success) {
    string msg = "win-version-info is unable to access file: ";
    msg.append(string(*file));
    return Nan::ThrowError(Nan::New(msg).ToLocalChecked());
  }

  info.GetReturnValue().Set(metadata);
}

NAN_MODULE_INIT(Init) {
  NAN_EXPORT(target, getInfo);
}

NODE_MODULE(VersionInfo, Init)
