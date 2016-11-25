Page({
  data: {
     help: [
            {   "opened": false,
                "sourceId": 2,
                "code": "reg_chanjianwenti1",
                "title": "桔子信用分是什么？",
                "body": "桔子信用分是在用户授权的情况下，依据客户各维度数据（涵盖金融流水、转账支付、投资、购物、出行、生活、等场景），运用云计算及机器学习等技术，通过逻辑模型算法，对各维度数据进行综合处理和评估，以分数的形式呈现个人信用状况的综合评分。*授信过程不产生任何费用*"
            },
            {
                "opened": false,
                "sourceId": 13,
                "code": "org_changjianwenti2",
                "title": "信用评估需要多长的时间？",
                "body": "如果您提交的资料真实有效，我们一般会在3分钟内为您评估一个桔子信用分，如遇到高峰期，系统审核处理速度会有所延迟，请您谅解。"
            },
            {
                "opened": false,
                "sourceId": 14,
                "code": "org_changjianwenti3",
                "title": "信用评估是如何进行审核的？",
                "body": "桔子信用审批由审核系统自动决议，提交或授权的资料越充分授信额度就可能批得越高。请您保证您信息的真实性，若被检测出虚假信息，系统将会采取拒绝决议，若涉嫌恶意信息作假或盗用他人信息，将可能记入网络征信系统，影响您的征信记录。"
            },
            {
                "opened": false,
                "sourceId": 15,
                "code": "org_changjianwenti4",
                "title": "桔子信用分的分值范围？",
                "body": "分值范围350到950。持续的数据跟踪表明，桔子信用分越高代表信用水平越好，在金融领域、生活服务等场景中都表现出了越低的违约概率，较高的桔子信用分可以帮助客户获得更高效、更优质的服务。"
            },
            {
                "opened": false,
                "sourceId": 16,
                "code": "org_changjianwenti5",
                "title": "信用评估需要哪些资料？",
                "body": "姓名、手机号码、身份证号码、专属本人的支付宝账号。"
            },
            {
                "opened": false,
                "sourceId": 17,
                "code": "org_changjianwenti6",
                "title": "如何提升信用分？",
                "body": "完成信用评估后，点击【信用提升】进入其页面，通过点击页面上方的【通讯录】、【支付宝】和【芝麻信用】图标进行授信绑定。系统会依据您提供的资料，给予您提升相应的额度。*在绑定授权时，请在手机设置里开启桔子信用相应权限*"
            },
            {
                "opened": false,
                "sourceId": 18,
                "code": "org_changjianwenti7",
                "title": "如何获得更高的信用分？",
                "body": "(1)保证您个人资料的真实性，对于提供虚假资料的申请者系统会进行拒绝处理；\r\n(2)保证您提交资料的唯一性，对于手机号、身份证号、专属本人的支付宝账号与他人重复的申请者系统会做出拒绝处理；\r\n(3)保证您提交有效资料的充分性，越多授权越有利于获得准确评估；\r\n(4)通过完善并提高【支付宝】中的【芝麻信用分】，也可以获得更高的额度；\r\n(5)保证您还款记录良好，对于还款良好的用户我们将定期进行额度调整。"
            },
            {
                "opened": false,
                "sourceId": 19,
                "code": "org_changjianwenti8",
                "title": "信用分为什么一直没有变化？",
                "body": "桔子信用分，每月自然更新一次；桔子信用审批由审核系统自动决议，提交或授权的资料越充分授信额度就可能批得越高。额度长时间没有变化或者一直处于较低的分值，可能是因为您综合评分不足或者资料不实；当桔子信用发现您是高风险用户时会不给予您信用额度或提升，高风险行为包括：\r\n(1)授权信息不真实；\r\n(2)授权信息与其他用户重复；\r\n如您对结果存有疑义，可以联系桔子信用客服。"
            },
            {
                "opened": false,
                "sourceId": 20,
                "code": "org_changjianwenti9",
                "title": "如何查询账单和还款情况？",
                "body": "你可以在登录之后点击主页下方的【还款】中查看并了解您的借款以及还款情况。通过点击【还款】页面中的【还款计划】查看更加详细的借款以及还款信息。"
            },
            {
                "opened": false,
                "sourceId": 21,
                "code": "org_changjianwenti10",
                "title": "如何查看正在审批的贷款情况？",
                "body": "在【我】的页面中，点击【审批进度】查看实时详尽的贷款审批情况。"
            }
        ]
  },
  taphelpItem: function (e) {
    console.log(e.currentTarget.id);
     var helpItem = this.data.help[parseInt(e.currentTarget.id)] 
    
      var changeData = {}
      var opened = helpItem.opened

       changeData['help[' + e.currentTarget.id + '].opened'] = !opened
       this.setData(changeData)
    
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    //加载数据
    // http://mobile.yuyanzhe.me/app/help.json
    /**
     * {
	versionName : 1.1,
	device : 0,
	mac : F45C899F38F7,
	point : {
	lng : -122.406417,
	lat : 37.785834,
	locationType : 0,
	accuracy : 5,
	time : 0
},
	mobileCode : f8c3458cb9ed4c6ab15adbb29e1eab2f,
	version : 2,
	type : jvzhi,
	license : 5808896ae4b0d8009b7db789
}
     * 
     */
     /*网络请求*/ 
      //     wx.request({
      //   method: 'POST',
      //   url: 'http://mobile.yuyanzhe.me/app/help.json',
      //   data: {
      //   
      //   },
      //   header: {
      //       'Content-Type': 'application/json'
      //   },
      //   success: function(res) {
      //     console.log(res.data)
      //   }
      // })
          


  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }


})


