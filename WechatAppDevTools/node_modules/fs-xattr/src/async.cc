#include <node.h>
#include <nan.h>
#include <node_buffer.h>

#include <errno.h>
#include <stdlib.h>
#include <sys/xattr.h>

#include "error.h"
#include "util.h"

class XattrWorker : public Nan::AsyncWorker {
public:
  XattrWorker(Nan::Callback* cb) : Nan::AsyncWorker(cb), errorNumber(0) {}

  virtual void WorkComplete() {
    Nan::HandleScope scope;

    if (this->errorNumber == 0) {
      HandleOKCallback();
    } else {
      HandleErrorCallback();
    }

    delete callback;
    callback = NULL;
  }

protected:
  virtual void HandleErrorCallback() {
    v8::Local<v8::Value> argv[1] = {
      MakeXattrError(this->errorNumber)
    };

    callback->Call(1, argv);
  }

  void SetErrorNumber(const int errorNumber) {
    this->errorNumber = errorNumber;
  }

private:
  int errorNumber;
};

class SetWorker : public XattrWorker {
public:
  SetWorker(v8::Local<v8::Value> filename, v8::Local<v8::Value> attribute, v8::Local<v8::Value> value, Nan::Callback* cb) : XattrWorker(cb) {
    Nan::Utf8String aFilename(filename);
    Nan::Utf8String aAttribute(attribute);

    v8::Local<v8::Object> bufferObj = value->ToObject();

    this->filename = new std::string(*aFilename, aFilename.length());
    this->attribute = new std::string(*aAttribute, aAttribute.length());
    this->value = new std::string(node::Buffer::Data(bufferObj), node::Buffer::Length(bufferObj));
  }

  ~SetWorker() {
    delete this->filename;
    delete this->attribute;
    delete this->value;
  }

  void Execute () {
    #ifdef __APPLE__
    int res = setxattr(filename->c_str(), attribute->c_str(), value->data(), value->length(), 0, 0);
    #else
    int res = setxattr(filename->c_str(), attribute->c_str(), value->data(), value->length(), 0);
    #endif

    if (res == -1) return this->SetErrorNumber(errno);
  }

private:
  std::string *filename;
  std::string *attribute;
  std::string *value;
};

class GetWorker : public XattrWorker {
public:
  GetWorker(v8::Local<v8::Value> filename, v8::Local<v8::Value> attribute, Nan::Callback* cb) : XattrWorker(cb) {
    Nan::Utf8String aFilename(filename);
    Nan::Utf8String aAttribute(attribute);

    this->filename = new std::string(*aFilename, aFilename.length());
    this->attribute = new std::string(*aAttribute, aAttribute.length());
  }

  ~GetWorker() {
    delete this->filename;
    delete this->attribute;
  }

  void Execute () {
    ssize_t valueLen;

    #ifdef __APPLE__
    valueLen = getxattr(filename->c_str(), attribute->c_str(), NULL, 0, 0, 0);
    #else
    valueLen = getxattr(filename->c_str(), attribute->c_str(), NULL, 0);
    #endif

    if (valueLen == -1) {
      return this->SetErrorNumber(errno);
    }

    resultLength = static_cast<size_t>(valueLen);
    resultData = static_cast<char *>(malloc(resultLength));

    #ifdef __APPLE__
    valueLen = getxattr(filename->c_str(), attribute->c_str(), resultData, resultLength, 0, 0);
    #else
    valueLen = getxattr(filename->c_str(), attribute->c_str(), resultData, resultLength);
    #endif

    if (valueLen == -1) {
      free(resultData);
      return this->SetErrorNumber(errno);
    }
  }

protected:
  virtual void HandleOKCallback() {
    v8::Local<v8::Object> data = Nan::NewBuffer(resultData, resultLength).ToLocalChecked();
    v8::Local<v8::Value> argv[] = { Nan::Null(), data };

    callback->Call(2, argv);
  }

private:
  size_t resultLength;
  char *resultData;
  std::string *filename;
  std::string *attribute;
};

class ListWorker : public XattrWorker {
public:
  ListWorker(v8::Local<v8::Value> filename, Nan::Callback* cb) : XattrWorker(cb) {
    Nan::Utf8String aFilename(filename);

    this->filename = new std::string(*aFilename, aFilename.length());
  }

  ~ListWorker() {
    delete this->filename;
  }

  void Execute () {
    ssize_t valueLen;

    #ifdef __APPLE__
    valueLen = listxattr(filename->c_str(), NULL, 0, 0);
    #else
    valueLen = listxattr(filename->c_str(), NULL, 0);
    #endif

    if (valueLen == -1) {
      return this->SetErrorNumber(errno);
    }

    resultLength = static_cast<size_t>(valueLen);
    resultData = static_cast<char *>(malloc(resultLength));

    #ifdef __APPLE__
    valueLen = listxattr(filename->c_str(), resultData, (size_t) valueLen, 0);
    #else
    valueLen = listxattr(filename->c_str(), resultData, (size_t) valueLen);
    #endif

    if (valueLen == -1) {
      free(resultData);
      return ThrowExceptionErrno(errno);
    }
  }

protected:
  virtual void HandleOKCallback() {
    v8::Local<v8::Array> array = SplitStringArray(resultData, resultLength);
    v8::Local<v8::Value> argv[] = { Nan::Null(), array };

    free(resultData);

    callback->Call(2, argv);
  }

private:
  size_t resultLength;
  char *resultData;
  std::string *filename;
};

class RemoveWorker : public XattrWorker {
public:
  RemoveWorker(v8::Local<v8::Value> filename, v8::Local<v8::Value> attribute, Nan::Callback* cb) : XattrWorker(cb) {
    Nan::Utf8String aFilename(filename);
    Nan::Utf8String aAttribute(attribute);

    this->filename = new std::string(*aFilename, aFilename.length());
    this->attribute = new std::string(*aAttribute, aAttribute.length());
  }

  ~RemoveWorker() {
    delete this->filename;
    delete this->attribute;
  }

  void Execute () {
    #ifdef __APPLE__
    int res = removexattr(filename->c_str(), attribute->c_str(), 0);
    #else
    int res = removexattr(filename->c_str(), attribute->c_str());
    #endif

    if (res == -1) return this->SetErrorNumber(errno);
  }

private:
  std::string *filename;
  std::string *attribute;
};

NAN_METHOD(xattr_set) {
  Nan::Callback *cb = new Nan::Callback(info[3].As<v8::Function>());
  Nan::AsyncQueueWorker(new SetWorker(info[0], info[1], info[2], cb));
}

NAN_METHOD(xattr_get) {
  Nan::Callback *cb = new Nan::Callback(info[2].As<v8::Function>());
  Nan::AsyncQueueWorker(new GetWorker(info[0], info[1], cb));
}

NAN_METHOD(xattr_list) {
  Nan::Callback *cb = new Nan::Callback(info[1].As<v8::Function>());
  Nan::AsyncQueueWorker(new ListWorker(info[0], cb));
}

NAN_METHOD(xattr_remove) {
  Nan::Callback *cb = new Nan::Callback(info[2].As<v8::Function>());
  Nan::AsyncQueueWorker(new RemoveWorker(info[0], info[1], cb));
}
