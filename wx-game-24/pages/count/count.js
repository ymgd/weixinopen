var util = require('../../utils/util.js');
Page({
    data:{
         disabled:[false,false,false,false,false,false],
         countLine:[{firstNum:'',operator:'',nextNum:'',result:'',isCounted:false}],
         result:[],
         isFinised:false,
         isSuccessed:false,       
         grade:'初级',
         total:0,
         score:{gameIndex:0,successNum:0,skipNum:0,failNum:0}
    },
    onLoad:function(options){
        this.setData({grade:options.grade,userInfo:options.user})
        this.creatUnit();
    },
    creatUnit(){
            let g = this.data.grade, newData = util.count(g), beginDate = new Date().getTime();
            if(newData){
                this.setData({
                    numbers: newData.nums,
                    answer:newData.answer,
                    disabled:[false,false,false,false,false,false],
                    countLine:[{firstNum:'',operator:'',nextNum:'',result:'',isCounted:false}],               
                    isFinised:false,
                    isSuccessed:false,
                    modalHidden:true,
                    'score.gameIndex':this.data.score.gameIndex +1,
                    beginT:beginDate
                })
            }else{
                this.creatUnit();
            }            
       },
    
    usetoCount(e){        
        var num ,index = Number(e.target.dataset.index),disStatus=[],line = this.data.countLine.length - 1,newCountLine = this.data.countLine;
        let thisLine = this.data.countLine[line];
        if (index<4){
            num = this.data.numbers[index];
        }else{
            num =this.data.countLine[index - 4].result
        }

        if (thisLine.firstNum && thisLine.nextNum){
            return false;
        }else{
            if (!util.empty(thisLine.firstNum)){
                newCountLine[line].firstNum = num;
            }else{
                newCountLine[line].nextNum = num;
            }
             for (var i in this.data.disabled){
                disStatus[i] = i==index?true : this.data.disabled[i];           
            } 
            this.setData({           
                countLine:newCountLine,
                disabled:disStatus
            });
        }       
    },
    useOperator(e){
        var o = e.target.dataset.operator,line = this.data.countLine.length - 1 ,newCountLine = this.data.countLine;
        newCountLine[line].operator = o;
        this.setData({
            countLine:newCountLine
        });
    },
    toCount(){
        var oldData = this.data;
        var line = oldData.countLine.length - 1,thisLine =oldData.countLine[line], num1 = Number( thisLine.firstNum),num2 = Number(thisLine.nextNum),o = thisLine.operator,r=Number( thisLine.result);
        var newCountLine = oldData.countLine;       

        if (!util.empty(num1) || !util.empty(num2) || o =='' ){
            return false;
        }else{
            if (o=='+'){
                r=num1 + num2;
            }else if(o == '-'){
                r=num1 - num2;
            }else if(o == '×'){
                r= num1 * num2;
            }else{
                r= num1/num2;
            }
           
            newCountLine[line].result = String(r);
            newCountLine[line].isCounted = true; //当行计算完成
            
            if (oldData.disabled.indexOf(false)<0){
                //已经用完可用数字
                let useTime = Math.floor((new Date().getTime() - oldData.beginT)/1000),useTimeTxt='';
                if (useTime >=60){
                    useTimeTxt +=parseInt(useTime/60) + '分'+ (useTime % 60) +'秒'
                }else{
                    useTimeTxt = useTime +'秒';
                }          
                if (Number(r) == 24){                   
                     let thisGradeNum = 1,thisScore=0;
                     if (oldData.grade == '中级'){
                         thisGradeNum = 2;
                     }else if(oldData.grade == '高级'){
                        thisGradeNum = 3;
                     }
                     thisScore = thisGradeNum * Math.max(1,Math.ceil(2-(useTime-13)/6)) + oldData.total;
                   
                                          
                       this.setData({total:oldData.total + thisScore}); 
                    
                        //结果正确
                        this.setData({
                            countLine : newCountLine,
                            isFinished:true,
                           // modalHidden:false,
                            isSuccessed:true,
                            'score.successNum':Number(oldData.score.successNum) +1,
                            thisUnitTime:useTime,
                            total: thisScore
                        })                        
                    
                }else{
                    //结果错误
                    this.setData({
                        countLine : newCountLine,
                        isFinished:true,
                        //modalHidden:false,
                        isSuccessed:false,
                        'score.failNum':Number(oldData.score.failNum) +1,
                        thisUnitTime:useTimeTxt
                    })
                }
                //每局完成的反馈
                if (oldData.score.gameIndex >=10 && oldData.score.successNum >=8){ 
                       let that=this, btnTxt= oldData.grade=='高级'?'看看总成绩':'下一等级',cnt = '';
                       if (oldData.grade=='高级'){
                           cnt="最难的一关你已经赢了"+(oldData.score.successNum+1) +"局，这么厉害，你咋不上天呢？"       
                       }else{
                           cnt="您已经玩了"+(oldData.score.gameIndex)+"轮"+oldData.grade +"级别的游戏，胜率达到"+Math.floor(oldData.score.successNum/oldData.score.gameIndex*10000)/100+"%，这么厉害，赶紧去玩下个等级的游戏吧！"
                       }
                       wx.showModal({
                            content: cnt,
                            title:'过关',
                            confirmText:btnTxt ,
                            showCancel:false,
                            success: function(res) {
                                if (res.confirm) {
                                    if ( that.data.grade=='高级'){
                                        wx.navigateTo({ url: '../result/result?total='+that.data.total+'&user='+that.data.userInfo});
                                    }else{
                                        let newGrade = that.data.grade=="初级"?'中级':'高级';      
                                        that.setData({grade:newGrade});  
                                        that.creatUnit();
                                        that.setData({score:{gameIndex:1,successNum:0,skipNum:0,failNum:0}})
                                    }
                                }
                            }
                        })
                    }else{
                let that = this,cnt = '',tt='可惜，不对哦！';
                        if(Number(r) == 24){
                            if(useTime<=18){
                                cnt='天才，受我一拜！'
                            }else if(useTime<=53){
                                cnt='您真是才思敏捷！'
                            }else if(useTime<=70){
                                cnt='争取更快点，加油！' 
                            }else{
                                cnt='脑子生锈了吧？那更需要动动咯，加油'
                            }
                            tt='祝贺你，成功了！'    
                        }
                        
                        cnt+="你用了"+useTime+"秒完成这题的计算。"
                        wx.showModal({
                            title: tt,
                            content: cnt,
                            confirmText:"下一题" ,
                            cancelText:"重新算一次" ,
                            success: function(res) {
                                if (res.confirm) {
                                    that.creatUnit();
                                }else{
                                    that.setData(
                                        {
                                            disabled:[false,false,false,false,false,false],
                                            countLine:[{firstNum:'',operator:'',nextNum:'',result:'',isCounted:false}],
                                            isFinised:false,
                                            isSuccessed:false,
                                            modalHidden:true
                                        }
                                    )
                                }
                            }
                        })
                    }
            }else{
                //计算未完成，生成新一行空的算式列式
                 newCountLine.push({firstNum:'',nextNum:'',isCounted:false});
                 this.setData({isFinished:false,countLine : newCountLine});
            }
        }
    },
    getNextUnit(){        
        this.creatUnit();
    },
    reCount(){
        this.setData(
            {
                disabled:[false,false,false,false,false,false],
                countLine:[{firstNum:'',operator:'',nextNum:'',result:'',isCounted:false}],
                isFinised:false,
                isSuccessed:false,
                modalHidden:true
            }
        )
    },
    toSkip(){
        this.setData({'score.skipNum':Number(this.data.score.skipNum) +1});
        this.creatUnit();
    }
});