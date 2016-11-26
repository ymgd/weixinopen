/** 事件源 */
var _target = {};

/**
 * 注册事件源 [每个page载入或切换须注册或重新注册事件源 最好是在onShow中注册]
 */
var register = function (target) {
    _target = target;
}

/**
 * 设置值
 */
var _setValue = function (id, key, value) {
    if (!_target.data[id]) {
        _target.data[id] = {};
    }
    var change = {};
    if (key) {
        id = id + '.' + key;
    }
    change[id] = value;
    _target.setData(change);
}

/**
 * 获取值
 */
var _getValue = function (id, key) {
    if (!_target.data[id]) {
        return undefined;
    }
    return _target.data[id][key];
}

/**
 * style转json
 */
var _styleToJson = function (value) {
    var object = {};
    var array = value.split(';');
    for (var i = 0; i < array.length; i++) {
        if (array[i].trim().length) {
            var temp = array[i].split(':');
            object[temp[0].trim()] = temp[1].trim();
        }
    }
    return object;
}

/**
 * 格式化style
 */
var _formatStyle = function (params, value) {
    if (value !== undefined) {
        value = _styleToJson(value);
        for (var key in value) {
            if (!params[key]) {
                params[key] = value[key];
            }
        }
    }
    var style = '';
    for (var key in params) {
        style += key + ' : ' + params[key] + '; ';
    }
    return style.trim();
}

/** 事件对象 [存储了所有page的事件回调] */
var _eventsObject = {};

/**
 * 调用事件
 */
var callEvent = function (prop) {
    var name = _target.name, id = prop.currentTarget.id, type = prop.type;
    if (!_eventsObject[name]) {
        _eventsObject[name] = {};
    }
    if (!_eventsObject[name][id]) {
        _eventsObject[name][id] = {};
    }
    var events = _eventsObject[name][id]['events'];
    if (!events) {
        return;
    }
    if (!events[type]) {
        return;
    }
    var callback = events[type];
    if (callback && typeof callback === 'function') {
        callback(prop);
    }
}

/**
 * 数组元素移除
 */
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

/**
 * wxQuery
 */
var $ = function (id) {
    return {
        hasStyle : function (key, val) {
            var style = _getValue(id, 'style');
            if (style) {
                style = _styleToJson(style);
            }
            for (var i in style) {
                if (i === key && style[i] === val) {
                    return true;
                }
            }
            return false;
        },
        addStyle : function (params) {
            for (var key in params) {
                if (this.hasStyle(key, params[key])) {
                    delete params[key];
                }
            }
            _setValue(id, 'style', _formatStyle(params, _getValue(id, 'style')));
            return this;
        },
        removeStyle : function (params) {
            var style = _getValue(id, 'style');
            if (style) {
                style = _styleToJson(style);
            }
            for (var i in params) {
                if (this.hasStyle(i, params[i])) {
                    delete style[i];
                }
            }
            _setValue(id, 'style', _formatStyle(style));
            return this;
        },
        toggleStyle : function (params) {
            for (var key in params) {
                if (this.hasStyle(key, params[key])) {
                    var style = {};
                    style[key] = params[key];
                    this.removeStyle(style);
                    delete params[key];
                }
            }
            this.addStyle(params);
            return this;
        }, 
        show : function () {
            this.removeStyle({'display' : 'none'});
            return this;
        },
        hide : function () {
            this.addStyle({'display' : 'none'});
            return this;
        },
        toggle : function () {
            if (this.hasStyle('display', 'none')) {
                this.show();
            } else {
                this.hide();
            }
            return this;
        },
        hasClass : function (name) {
            var classes = _getValue(id, 'class');
            if (classes === undefined) {
                classes = [];
            } else {
                classes = classes.split(' ');
            }
            if (classes.indexOf(name) > -1) {
                return true;
            }
            return false;
        },
        addClass : function () {
            var classes = _getValue(id, 'class');
            if (classes === undefined) {
                classes = [];
            } else {
                classes = classes.split(' ');
            }
            for (var i in arguments) {
                if (!this.hasClass(arguments[i])) {
                    classes.push(arguments[i]);
                }
            }
            _setValue(id, 'class', classes.join(' '));
            return this;
        },
        removeClass : function () {
            var classes = _getValue(id, 'class');
            if (classes === undefined) {
                classes = '';
            }
            for (var i in arguments) {
                classes = classes.replace(arguments[i], '');
            }
            _setValue(id, 'class', classes.trim());
            return this;
        },
        toggleClass : function () {
            var classes = _getValue(id, 'class');
            if (classes === undefined) {
                classes = [];
            } else {
                classes = classes.split(' ');
            }
            for (var i = 0; i < arguments.length; i++) {
                if (!this.hasClass(arguments[i])) {
                    classes.push(arguments[i]);
                } else {
                    classes.remove(arguments[i]);
                }
            }
            _setValue(id, 'class', classes.join(' '));
            return this;
        },
        text : function (str) {
            _setValue(id, 'text', str);
            return this;
        },
        attr : function (key, value) {
            _setValue(id, 'attr.' + key, value);
            return this;
        },
        value : function (object) {
            if (typeof object === 'object') {
                object = JSON.stringify(object);
            }
            _setValue(id, 'value', object);
            return this;
        },
        bind : function (type, callback) {
            var name = _target.name;
            if (!_eventsObject[name]) {
                _eventsObject[name] = {};
            }
            if (!_eventsObject[name][id]) {
                _eventsObject[name][id] = {};
            }
            if (!_eventsObject[name][id]['events']) {
                _eventsObject[name][id]['events'] = {}
            }
            if (callback && typeof callback === 'function') {
                _eventsObject[name][id]['events'][type] = callback;
            }
            return this;
        },
        unbind : function (type) {
            var name = _target.name;
            if (!_eventsObject[name]) {
                _eventsObject[name] = {};
            }
            if (!_eventsObject[name][id]) {
                _eventsObject[name][id] = {};
            }
            if (!_eventsObject[name][id]['events']) {
                _eventsObject[name][id]['events'] = {}
            }
            delete _eventsObject[name][id]['events'][type];
            return this;
        },
        getValue : function (key) {
            return _getValue(id, key);
        },
        setValue : function (key, value) {
            _setValue(id, key, value);
            return this;
        }
    };
}

module.exports = {
    $ : $,
    register : register,
    callEvent : callEvent
};