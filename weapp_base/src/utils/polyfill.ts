export function ensureArrayFind() {
    console.log('ensureArrayFind');
    // 给Array添加find方法，兼容es5
    if (!Array.prototype.find) {
        Array.prototype.find = function (predicate) {
            'use strict';
            if (this == null) {
                throw new TypeError('Array.prototype.find called on null or undefined');
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            let list = Object(this);
            let length = list.length >>> 0;
            let thisArg = arguments[1];
            let value;

            for (let i = 0; i < length; i++) {
                value = list[i];
                if (predicate.call(thisArg, value, i, list)) {
                    return value;
                }
            }
            return undefined;
        };
    }
};

export function find<T>(array: Array<T>, predicate: (value: T, index: number, obj: Array<T>) => boolean): T {
    ensureArrayFind()
    return array.find(predicate)
}

export let ensureString = function () {
    console.log('ensureArrayFind');
    /*! http://mths.be/startswith v0.2.0 by @mathias */
    if (!String.prototype.startsWith) {
        (function () {
            'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
            let defineProperty = (function () {
                // IE 8 only supports `Object.defineProperty` on DOM elements
                try {
                    let object = {};
                    let $defineProperty = Object.defineProperty;
                    let result = $defineProperty(object, object, object) && $defineProperty;
                } catch (error) { }
                return result;
            } ());
            let toString = {}.toString;
            let startsWith = function (search) {
                if (this == null) {
                    throw TypeError();
                }
                let string = String(this);
                if (search && toString.call(search) == '[object RegExp]') {
                    throw TypeError();
                }
                let stringLength = string.length;
                let searchString = String(search);
                let searchLength = searchString.length;
                let position = arguments.length > 1 ? arguments[1] : undefined;
                // `ToInteger`
                let pos = position ? Number(position) : 0;
                if (pos != pos) { // better `isNaN`
                    pos = 0;
                }
                let start = Math.min(Math.max(pos, 0), stringLength);
                // Avoid the `indexOf` call if no match is possible
                if (searchLength + start > stringLength) {
                    return false;
                }
                let index = -1;
                while (++index < searchLength) {
                    if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
                        return false;
                    }
                }
                return true;
            };
            if (defineProperty) {
                defineProperty(String.prototype, 'startsWith', {
                    'value': startsWith,
                    'configurable': true,
                    'writable': true
                });
            } else {
                String.prototype.startsWith = startsWith;
            }
        } ());
    }
}

export function assign(target: any, ...sources: any[]) {
    if (typeof Object.assign != 'function') {
        Object.assign = function (target) {
            'use strict';
            if (target == null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            target = Object(target);
            for (let index = 1; index < arguments.length; index++) {
                let source = arguments[index];
                if (source != null) {
                    for (let key in source) {
                        if (Object.prototype.hasOwnProperty.call(source, key)) {
                            target[key] = source[key];
                        }
                    }
                }
            }
            return target;
        };
    }
    Object.assign(target, sources)
}

export function clone(obj) {

    if (null == obj || "object" != typeof obj) return obj;

    if (obj instanceof Date) {
        let copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    if (obj instanceof Array) {
        let copy = [];
        for (let i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    if (obj instanceof Object) {
        let copy = {};
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = clone(obj[attr]);
            }
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

export function ensureFindIndex() {
    if (!Array.prototype.findIndex) {
        Array.prototype.findIndex = function (predicate) {
            if (this === null) {
                throw new TypeError('Array.prototype.findIndex called on null or undefined');
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            let list = Object(this);
            let length = list.length >>> 0;
            let thisArg = arguments[1];
            let value;

            for (let i = 0; i < length; i++) {
                value = list[i];
                if (predicate.call(thisArg, value, i, list)) {
                    return i;
                }
            }
            return -1;
        };
    }
}