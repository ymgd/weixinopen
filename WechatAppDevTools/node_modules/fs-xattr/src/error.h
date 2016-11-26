#ifndef LD_ERROR_H
#define LD_ERROR_H

#include <v8.h>

v8::Local<v8::Value> MakeXattrError(int e);
void ThrowExceptionErrno(int e);

#endif
