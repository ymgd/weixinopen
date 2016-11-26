#include <node.h>
#include <nan.h>

v8::Local<v8::Array> SplitStringArray(const char *data, size_t length) {
  Nan::EscapableHandleScope scope;

  v8::Local<v8::Array> array = Nan::New<v8::Array>(0);

  int arrayPos = 0;
  size_t valuePos = 0;

  while (valuePos < length) {
    size_t len = strlen(data + valuePos);
    Nan::Set(array, arrayPos, Nan::New<v8::String>(data + valuePos, len).ToLocalChecked());
    valuePos += len + 1;
    arrayPos++;
  }

  Nan::Set(array, Nan::New("length").ToLocalChecked(), Nan::New<v8::Integer>(arrayPos));

  return scope.Escape(array);
}
