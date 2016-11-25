
## 微信小程序,HTML转WXML。

### usage:

1. 引入`src`里面`html2json.js/html2wxml.wxml/htmlparser.js/example.wxss`到工程`lib`目录下;
2. 在需要将html转wxml的地方按下添加代码;

`wxml`:

```html
<import src="../src/html2wxml.wxml/"/><!--按实际工程目录结构-->

<template is="html2Wxml" data="{{innerHTML}}"></template>
```

`js`:

```javascript
'use strict';

import {html2json} from '../src/html2json';//按实际工程目录结构

Page({
  data: {
    innerHTML: html2json('<div>a<span>b</span></div><p>c</p>'/*需要转的html*/).child
  },
  ...
});
```

`wxss`:

```css
@import "../src/html2wxml.wxss";//按实际工程目录结构
```

#### TIP:

在`example.wxss`中，可自定义添加修改html标签对应的样式，以满足不同的需求，也欢迎提供全面的样式提交`pull request`。

标签列表：

```javascript
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
]
```

