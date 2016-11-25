/**
 * author: Di (微信小程序开发工程师)
 * organization: WeAppDev(微信小程序开发论坛)(http://weappdev.com)
 *               垂直微信小程序开发交流社区
 * 
 * github地址: https://github.com/icindy/WxEmojiView
 * 
 * for: WxEmojiView-微信小程序Emoji展示输入组件
 * detail : 
 * 
 * version: alpha 0.1 非正式版
 */
var __this;
let __emojis = {};//保存定义了的小表情
var __emojiArray = [];
var __reg;//正则表达式配置

var ___text="";//用于存储textarea值，上传保存需要用这个
var ___temTextArea;//用于纪录聚焦的textareare
var ___Objs;

function init(reg,emojis){
    __reg = reg;
    __emojis = emojis;
    __emojiArray = [];
    for (var key in __emojis){
      __emojiArray.push(key);
    }
}
function bindThis(e){
  __this = e;
  var temObjs = {};
  temObjs.showWxEmojiChooseView = 1;
  temObjs.textAreaText = ___text;
  temObjs.emojiArray = __emojiArray;
  ___Objs = temObjs;
  __this.setData({
    WxEmojiObjs:temObjs
  });
}

function buildTextObjs(e,str){
  var temObjs = {};
  temObjs.WxEmojiTextArray = transEmojiStr(str);
  __this.setData({
    WxEmojiObjs:temObjs
  });
}

function buildTextAreaObjs(e,str){
  var temObjs = {};
  temObjs.showWxEmojiChooseView = 1;
  // temObjs.textAreaText = "hello test! :00: :01: :02: _03_ /04 🍉";
  ___text = str;
  if(typeof(___text) === 'undefined'){
    ___text="";
  }
  temObjs.WxEmojiTextArray = transEmojiStr(str);
  temObjs.textAreaText = ___text;
  temObjs.emojiArray = __emojiArray;
  ___Objs = temObjs;
  __this.setData({
    WxEmojiObjs:temObjs
  });
}

function transEmojiStr(str){
  // var eReg = new RegExp("["+__reg+' '+"]");
  var eReg = new RegExp("["+__reg+"]");
  var array = str.split(eReg);
  var emojiObjs = [];
  for(var i = 0; i < array.length; i++){
    var ele = array[i];
    var emojiObj = {};
    if(__emojis[ele]){
      emojiObj.node = "element";
      emojiObj.tag = "emoji";
      emojiObj.text = __emojis[ele];
    }else{
      emojiObj.node = "text";
      emojiObj.text = ele;
    }
    emojiObjs.push(emojiObj);
  }
  
  return emojiObjs;
}

function WxEmojiTextareaBlur(target,e){
    __this = target;
    if(e.detail.value.length == 0){
      return;
    }
    console.log(e.detail.value);
    buildTextAreaObjs(__this,e.detail.value);
}

function WxEmojiTextareaFocus(target,e){
    __this = target;
}

function wxPreEmojiTap(target,e){
    __this = target;
    var preText = e.target.dataset.text;
    if(preText.length == 0){
      return;
    }
    ___text = ___text + preText;
    ___Objs.textAreaText = ___text;
    __this.setData({
      WxEmojiObjs:___Objs
    });

    buildTextAreaObjs(__this,___text);
}



module.exports = {
  init:init,
  bindThis: bindThis,
  text:___text,
  transEmojiStr: transEmojiStr,
  buildTextObjs:buildTextObjs,
  buildTextAreaObjs,buildTextAreaObjs,
  WxEmojiTextareaFocus: WxEmojiTextareaFocus,
  WxEmojiTextareaBlur: WxEmojiTextareaBlur,
  wxPreEmojiTap: wxPreEmojiTap
}