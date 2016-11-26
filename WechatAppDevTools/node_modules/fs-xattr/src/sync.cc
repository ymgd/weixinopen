#include <node.h>
#include <nan.h>
#include <node_buffer.h>

#include <errno.h>
#include <stdlib.h>
#include <sys/xattr.h>

#include "error.h"
#include "util.h"

NAN_METHOD(xattr_get_sync) {
  Nan::Utf8String aFilename(info[0]);
  Nan::Utf8String aAttribute(info[1]);

  const char *filename = *aFilename;
  const char *attribute = *aAttribute;

  ssize_t valueLen;

#ifdef __APPLE__
  valueLen = getxattr(filename, attribute, NULL, 0, 0, 0);
#else
  valueLen = getxattr(filename, attribute, NULL, 0);
#endif

  if (valueLen == -1) {
    return ThrowExceptionErrno(errno);
  }

  v8::Local<v8::Object> slowBuffer = Nan::NewBuffer((uint32_t) valueLen).ToLocalChecked();

#ifdef __APPLE__
  valueLen = getxattr(filename, attribute, node::Buffer::Data(slowBuffer), (size_t) valueLen, 0, 0);
#else
  valueLen = getxattr(filename, attribute, node::Buffer::Data(slowBuffer), (size_t) valueLen);
#endif

  if (valueLen == -1) {
    return ThrowExceptionErrno(errno);
  }

  v8::Local<v8::Object> globalObj = Nan::GetCurrentContext()->Global();
  v8::Local<v8::Function> bufferConstructor = v8::Local<v8::Function>::Cast(globalObj->Get(Nan::New("Buffer").ToLocalChecked()));
  v8::Handle<v8::Value> constructorArgs[3] = { slowBuffer, Nan::New<v8::Integer>((int32_t) valueLen), Nan::New<v8::Integer>(0) };
  v8::Local<v8::Object> actualBuffer = bufferConstructor->NewInstance(3, constructorArgs);

  info.GetReturnValue().Set(actualBuffer);
}

NAN_METHOD(xattr_set_sync) {
  Nan::Utf8String aFilename(info[0]);
  Nan::Utf8String aAttribute(info[1]);

  const char *filename = *aFilename;
  const char *attribute = *aAttribute;

  v8::Local<v8::Object> bufferObj = info[2]->ToObject();
  const char *value = node::Buffer::Data(bufferObj);
  size_t valueLen = node::Buffer::Length(bufferObj);

#ifdef __APPLE__
  int res = setxattr(filename, attribute, value, valueLen, 0, 0);
#else
  int res = setxattr(filename, attribute, value, valueLen, 0);
#endif

  if (res == -1) {
    return ThrowExceptionErrno(errno);
  }
}

NAN_METHOD(xattr_list_sync) {
  Nan::Utf8String aFilename(info[0]);
  const char *filename = *aFilename;

  ssize_t valueLen;

#ifdef __APPLE__
  valueLen = listxattr(filename, NULL, 0, 0);
#else
  valueLen = listxattr(filename, NULL, 0);
#endif

  if (valueLen == -1) {
    return ThrowExceptionErrno(errno);
  }

  char *result = (char *) malloc((size_t) valueLen);

#ifdef __APPLE__
  valueLen = listxattr(filename, result, (size_t) valueLen, 0);
#else
  valueLen = listxattr(filename, result, (size_t) valueLen);
#endif

  if (valueLen == -1) {
    free(result);
    return ThrowExceptionErrno(errno);
  }

  v8::Local<v8::Array> array = SplitStringArray(result, static_cast<size_t>(valueLen));

  free(result);

  info.GetReturnValue().Set(array);
}

NAN_METHOD(xattr_remove_sync) {
  Nan::Utf8String aFilename(info[0]);
  Nan::Utf8String aAttribute(info[1]);

  const char *filename = *aFilename;
  const char *attribute = *aAttribute;

#ifdef __APPLE__
  int res = removexattr(filename, attribute, 0);
#else
  int res = removexattr(filename, attribute);
#endif

  if (res == -1) {
    return ThrowExceptionErrno(errno);
  }
}
