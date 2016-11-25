'use strict';

import {html2json} from '../src/html2json';

Page({
  data: {
    innerHTML: html2json('<div>a<span>b</span></div><p>c</p>').child
  },
  ...
});