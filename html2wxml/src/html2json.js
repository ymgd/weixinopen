'use strict';

import {HTMLParser, HTMLtoXML, HTMLtoDOM} from './htmlparser';

let DEBUG = false;
var debug = DEBUG ? console.log.bind(console) : function () {
};

function q(v) {
  return '"' + v + '"';
}

function removeDOCTYPE(html) {
  return html
    .replace(/<\?xml.*\?>\n/, '')
    .replace(/<!doctype.*\>\n/, '')
    .replace(/<!DOCTYPE.*\>\n/, '');
}

export const html2json = function html2json(html) {
  html = (html || '').replace(/\s+/g, ' ');
  html = removeDOCTYPE(html);
  var bufArray = [];
  var results = {
    node: 'root',
    child: [],
  };
  HTMLParser(html, {
    start: function (tag, attrs, unary) {
      debug(tag, attrs, unary);
      // node for this element
      var node = {
        node: 'element',
        tag: tag,
      };

      if (attrs.length !== 0) {
        node.attr = attrs.reduce(function (pre, attr) {
          var name = attr.name;
          var value = attr.value;
          
          // 去掉空格
          value = value.replace(/\s/g, '');
          // 多个值划分,单位转换
          let values = value.split(';');
          value = (values || []).map(value => {
            if(value.indexOf('px') != -1) {
              let v = value.split(':')[1];
              let key = value.split(':')[0]
              if(v.split(/\s/g).length > 1) {
                return v.map(vi => {
                  let va = Number.parseInt(vi);
                  if (!isNaN(va))  {
                    va = va * 2;
                    return `${key}: ${va}rpx;`;
                  }
                  return value;
                });
              } else {
                let va = Number.parseInt(v);
                if (!isNaN(va))  {
                  va = va * 2;
                  return `${key}: ${va}rpx;`;
                }
                return value;
              }
            } else {
              return value;
            }
          }).join(' ');

          // if attr already exists
          // merge it
          if (pre[name]) {
            if (Array.isArray(pre[name])) {
              // already array, push to last
              pre[name].push(value);
            } else {
              // single value, make it array
              pre[name] = [pre[name], value];
            }
          } else {
            // not exist, put it
            pre[name] = value;
          }

          return pre;
        }, {});
      }

      // 标题样式等
      let tagClass =
        [
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'a',
          'abbr',
          'address',
          'applet',
          'acronym',
          'area',
          'article',
          'aside',
          'audio',
          'b',
          'base',
          'basefont',
          'bdi',
          'bdo',
          'big',
          'blockquote',
          'body',
          'br',
          'button',
          'canvas',
          'caption',
          'center',
          'cite',
          'code',
          'col',
          'colgroup',
          'command',
          'datalist',
          'dd',
          'del',
          'details',
          'dfn',
          'dir',
          'div',
          'dl',
          'dt',
          'em',
          'embed',
          'fieldset',
          'figcaption',
          'figure',
          'font',
          'footer',
          'form',
          'frame',
          'frameset',
          'h1',
          'head',
          'header',
          'hgroup',
          'hr',
          'html',
          'i',
          'iframe',
          'img',
          'input',
          'ins',
          'keygen',
          'kbd',
          'label',
          'legend',
          'li',
          'link',
          'map',
          'mark',
          'menu',
          'meta',
          'meter',
          'nav',
          'noframes',
          'noscript',
          'object',
          'ol',
          'optgroup',
          'option',
          'output',
          'p',
          'param',
          'pre',
          'progress',
          'q',
          'rp',
          'ruby',
          's',
          'samp',
          'script',
          'select',
          'small',
          'source',
          'span',
          'strike',
          'strong',
          'style',
          'sub',
          'summary',
          'sup',
          'table',
          'tbody',
          'td',
          'textarea',
          'tfoot',
          'th',
          'thead',
          'time',
          'title',
          'tr',
          'track',
          'tt',
          'u',
          'ul',
          'var',
          'video',
          'wbr',
          'rt',
          'section'
        ];
      if(tagClass.includes(tag)) {
        if(node.attr && node.attr.class) {
          node.attr.class = `${node.attr.class} ${tag}`
        } else {
          node.attr = node.attr || {};
          node.attr.class = tag;
        }
      }

      if (unary) {
        // if this tag dosen't have end tag
        // like <img src="hoge.png"/>
        // add to parents
        var parent = bufArray[0] || results;
        if (parent.child === undefined) {
          parent.child = [];
        }
        parent.child.push(node);
      } else {
        bufArray.unshift(node);
      }
    },
    end: function (tag) {
      debug(tag);
      // merge into parent tag
      var node = bufArray.shift();
      if (node.tag !== tag) console.error('invalid state: mismatch end tag');

      if (bufArray.length === 0) {
        results.child.push(node);
      } else {
        var parent = bufArray[0];
        if (parent.child === undefined) {
          parent.child = [];
        }
        parent.child.push(node);
      }
    },
    chars: function (text) {
      debug(text);
      if(text == ' ') {
        return;
      }
      var node = {
        node: 'text',
        text: text,
      };
      if (bufArray.length === 0) {
        results.child.push(node);
      } else {
        var parent = bufArray[0];
        if (parent.child === undefined) {
          parent.child = [];
        }
        parent.child.push(node);
      }
    },
    comment: function (text) {
      debug(text);
      var node = {
        node: 'comment',
        text: text,
      };
      var parent = bufArray[0];
      if (parent.child === undefined) {
        parent.child = [];
      }
      parent.child.push(node);
    },
  });
  return results;
};

export const json2html = function json2html(json) {
  // Empty Elements - HTML 4.01
  var empty = ['area', 'base', 'basefont', 'br', 'col', 'frame', 'hr', 'img', 'input', 'isindex', 'link', 'meta', 'param', 'embed'];

  var child = '';
  if (json.child) {
    child = json.child.map(function (c) {
      return json2html(c);
    }).join('');
  }

  var attr = '';
  if (json.attr) {
    attr = Object.keys(json.attr).map(function (key) {
      var value = json.attr[key];
      if (Array.isArray(value)) value = value.join(' ');
      return key + '=' + q(value);
    }).join(' ');
    if (attr !== '') attr = ' ' + attr;
  }

  if (json.node === 'element') {
    var tag = json.tag;
    if (empty.indexOf(tag) > -1) {
      // empty element
      return '<' + json.tag + attr + '/>';
    }

    // non empty element
    var open = '<' + json.tag + attr + '>';
    var close = '</' + json.tag + '>';
    return open + child + close;
  }

  if (json.node === 'text') {
    return json.text;
  }

  if (json.node === 'comment') {
    return '<!--' + json.text + '-->';
  }

  if (json.node === 'root') {
    return child;
  }
};
