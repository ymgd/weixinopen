// detail.js
var request = require('../../request/request');
Page({
  data:{
    modalHidden: true,
    modalValue: '',
    loadingHidden: false,
    bookcover: '',
    bookname: '',
    bookauthor: '',
    booktranslator: '',
    isTranslator: false,
    bookpublisher: '',
    bookpubdate: '',
    bookaverage: '',
    booknumRaters: '',
    bookabstract: '',
    authorabstract: ''
  },
  onLoad:function(options){
    var bookId = options.bookId;
    // console.log(bookId);
    request.searchBookDetail(bookId, this.searchSuccess, this.searchFail);
  },
  // 获取成功
  searchSuccess: function(data){
    this.setData({
      loadingHidden: true,
      bookcover: data.images.small,
      bookname: data.title,
      bookauthor: data.author,
      bookpublisher: data.publisher,
      bookpubdate: data.pubdate,
      bookaverage: data.rating.average,
      booknumRaters: data.rating.numRaters,
      bookabstract: data.summary,
      authorabstract: data.author_intro
    });
    if(data.translator){
      this.setData({
        booktranslator: data.translator,
        isTranslator: true
      });
    }
  },
  // 获取失败
  searchFail: function(){
    this.setData({
      loadingHidden: true,
      modalHidden: false,
      modalValue: '获取图书详情失败'
    });
  },
  // 模态框确定事件处理
  modalChange: function(e){
    this.setData({
      modalHidden: true,
      modalValue: ''
    });
  }
})