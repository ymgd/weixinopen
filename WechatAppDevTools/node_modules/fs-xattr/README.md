# fs-xattr

Node.js module for manipulating extended attributes.

There are already some libraries for this, why use `fs-xattr`?

- Very useful errors
- No limits on value size
- Clean and easy api
- Proper asynchronous implementation

## Installation

```sh
npm install --save fs-xattr
```

## Usage

```javascript
var xattr = require('fs-xattr')
```

## API

### xattr.get(path, attr, cb)

Get extended attribute `attr` from file at `path`.

`cb` is a callback that will be called with `(err, val)`.

### xattr.getSync(path, attr)

Synchronous version of `xattr.get`

### xattr.set(path, attr, value, cb)

Set extended attribute `attr` to `value` on file at `path`.

`value` can be either a string or a `Buffer`.

`cb` is a callback that will be called with `(err)`.

### xattr.setSync(path, attr, value)

Synchronous version of `xattr.set`

### xattr.remove(path, attr, cb)

Remove extended attribute `attr` on file at `path`.

`cb` is a callback that will be called with `(err)`.

### xattr.removeSync(path, attr)

Synchronous version of `xattr.remove`

### xattr.list(path, cb)

List all attributes on file at `path`.

`cb` is a callback that will get called with `(err, list)`. `list` in an array of strings, e.g. `['com.linusu.test', 'com.apple.FinderInfo']`.

### xattr.listSync(path)

Synchronous version of `xattr.list`
