"use strict";function init(){var e=(require("fs"),require("path"),require("../utils/tools.js"));_exports=function(r){var t=r.pageFrameTpl,i=r.project,s=(r.url,r.config),n=e.getPageCssFiles(r.url,i);return n&&(t=t.replace("<!--{{currentstyle}}-->",'<script src="'+n+'"></script>')),t=t.replace("<!--{{generateFunc}}-->",r.generateFunc),t=t.replace("<!--{{pageconfig}}-->","<script> __wxConfig = {};  __wxConfig.window = "+JSON.stringify(s)+" </script>"),{header:{},body:t}}}var _exports;init(),module.exports=_exports;