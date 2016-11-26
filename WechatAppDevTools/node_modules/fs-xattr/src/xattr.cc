#include <node.h>
#include <nan.h>

#include "async.h"
#include "sync.h"

NAN_MODULE_INIT(Initialize) {
  Nan::Set(target, Nan::New("get").ToLocalChecked(),
    Nan::GetFunction(Nan::New<v8::FunctionTemplate>(xattr_get)).ToLocalChecked());
  Nan::Set(target, Nan::New("set").ToLocalChecked(),
    Nan::GetFunction(Nan::New<v8::FunctionTemplate>(xattr_set)).ToLocalChecked());
  Nan::Set(target, Nan::New("list").ToLocalChecked(),
    Nan::GetFunction(Nan::New<v8::FunctionTemplate>(xattr_list)).ToLocalChecked());
  Nan::Set(target, Nan::New("remove").ToLocalChecked(),
    Nan::GetFunction(Nan::New<v8::FunctionTemplate>(xattr_remove)).ToLocalChecked());

  Nan::Set(target, Nan::New("getSync").ToLocalChecked(),
    Nan::GetFunction(Nan::New<v8::FunctionTemplate>(xattr_get_sync)).ToLocalChecked());
  Nan::Set(target, Nan::New("setSync").ToLocalChecked(),
    Nan::GetFunction(Nan::New<v8::FunctionTemplate>(xattr_set_sync)).ToLocalChecked());
  Nan::Set(target, Nan::New("listSync").ToLocalChecked(),
    Nan::GetFunction(Nan::New<v8::FunctionTemplate>(xattr_list_sync)).ToLocalChecked());
  Nan::Set(target, Nan::New("removeSync").ToLocalChecked(),
    Nan::GetFunction(Nan::New<v8::FunctionTemplate>(xattr_remove_sync)).ToLocalChecked());
}

NODE_MODULE(xattr, Initialize)
