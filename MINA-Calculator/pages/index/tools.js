
function setNum(context,thisnum){
    if(context.data.action==1){
        context.setData({action:0,sd:'0'})
    }
    if(context.data.sd=='0'){
        var str=thisnum
        
    }else{
        if(context.data.sd.length<18){
            var str=context.data.sd+thisnum
        }else{
            var str=context.data.sd
        }
    }
    context.setData({sd:str})
}
function setPoint(context){

    var Cts = context.data.sd+''
    if(Cts.length<18){
        if(Cts.indexOf('.') > 0 ){
            var str=Cts
        }else{
            var str=Cts+'.'
        }
        context.setData({sd:str})
    }
    
}
function clean(context){
    context.setData({sd:0,action:0,num1:0,sign:''})
}
function back(context){
    var ostr=context.data.sd
    var str=ostr.substring(0,ostr.length-1)
    if(str.length<=0){
        str=0
    }
    
    context.setData({sd:str})
}
function plus(context){
    var n1=context.data.sd;
    context.setData({action:1,num1:n1,sign:'plus'})
}
function minus(context){
    var n1=context.data.sd;
    context.setData({action:1,num1:n1,sign:'minus'})
}
function times(context){
    var n1=context.data.sd;
    context.setData({action:1,num1:n1,sign:'times'})
}
function divide(context){
    var n1=context.data.sd;
    context.setData({action:1,num1:n1,sign:'divide'})
}
function equal(context){
    var n1=parseFloat(context.data.num1);
    var n2=parseFloat(context.data.sd);
    var res='0';
    switch(context.data.sign){
        case 'plus':res=n1+n2;break;
        case 'minus':res=n1-n2;break;
        case 'times':res=n1*n2;break;
        case 'divide':res=n1/n2;break;
        default :break;
    }
    
    context.setData({sd:res+'',num1:0});
}



module.exports={
    setNum:setNum,
    setPoint:setPoint,
    back:back,
    plus:plus,
    minus:minus,
    times:times,
    divide:divide,
    equal:equal,
    clean:clean

}
