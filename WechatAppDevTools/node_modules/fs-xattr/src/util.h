#ifndef LD_UTIL_H
#define LD_UTIL_H

#include <v8.h>

v8::Local<v8::Array> SplitStringArray(const char *data, size_t length);

#endif
