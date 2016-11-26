Page({
 data: {
     t1:"账户余额(元)：",
     t2:"充值金额(元)",
     t3:"充值",
     t4:"时间",
     t5:"操作",
     t6:"变动金额",
     add:"",
     count:1,
     arr:{
       itime:"",
       ch:"",
       add1:""
     },
     money:"0.00"
 },
 onLoad: function() {

 },
 chongzhi:function(){
     this.data.count++;
     var  amoney=parseFloat(this.data.add)+parseFloat(this.data.money);
     this.setData({
       money:amoney
     });
     var time=new Date();
     var itime1=time.toString();
     console.log(itime1);
     var imoney=parseFloat(this.data.money);
     var ch1="充值";
      this.setData({
        arr:{
          itime:itime1.substr(16,8),
          ch:ch1,
          add1:"+"+this.data.add
        }
      });

 },
 input:function(e){
   this.setData({
     add:e.detail.value
   })

 }
 })
