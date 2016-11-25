var Api = require('../../utils/api.js');
var View = require('../../utils/view.js');
var Menu = require('../../utils/menu.js');

var global_page
// var context
var context_lancet
var context_1
var point_lancet = []
Page({
    data: {
        //调色盘列表
        colors: ['#666666', '#FF0000', '#FFA500', 
        '#FFFF00', '#008000', '#0000FF', '#ffffff'],
        //选中的颜色
        paintColor: '#666666',
        context:"",

        mode:"lancet",

        displayLancet:true,
    },

    eventBase:function(e){
        global_page.eventListen(e)
        global_page.eventDisplay(e.currentTarget.dataset.action)
    },

    eventDisplay:function(action){
        var _display = {
            }
        if (_display.hasOwnProperty(action))
            _display[action]()
        // View.Switch.Work() //触发效果
    },

    eventListen:function(e){
        var _eventDict = {
            "modeChange":global_page.modeChange,
            "save":global_page.save,
        }
        if (_eventDict.hasOwnProperty(e.currentTarget.dataset.action))
            _eventDict[e.currentTarget.dataset.action](e) 
    },
    modeChange:function(e){
        var _mode = e.currentTarget.dataset.mode
        global_page.setData({
            mode:_mode
        })
    },

    //铅笔模式
    modePecile(event,_context_,clientX,clientY){
        var that = event
        var _context = _context_
        _context.beginPath()
        _context.setStrokeStyle (that.data.paintColor) ;
        _context.setLineWidth (2)
        _context.setGlobalAlpha(0.1)
        _context.moveTo(that.movements[0],that.movements[1])
        _context.lineTo(clientX,clientY)
        _context.stroke(); 
        _context.closePath()
        that.movements = [clientX, clientY];
    },
    //柳叶笔模式
    modeLancet(event,_context_,clientX,clientY){
        //仿画吧，柳叶刀
        var that = event
        var _context = _context_
        _context.beginPath()
        _context.setFillStyle (that.data.paintColor) ;
        _context.setStrokeStyle (that.data.paintColor) ;
        // _context.setLineWidth (2)
        _context.moveTo(that.startX,that.startY)
        _context.setGlobalAlpha(0.2)
        _context.lineTo(that.movements[0],that.movements[1])
        _context.lineTo(clientX,clientY)
        _context.setLineCap("round")
        _context.setLineJoin("miter")
        _context.setMiterLimit(10)
        _context.fill()
        // _context.stroke();  
        _context.closePath()
        that.movements = [clientX, clientY];
    },
    //橡皮擦模式
    modeEraser(){},

    chooseColor(event) {
        let paintColor = event.currentTarget.dataset.color;
        global_page.setData({ paintColor });
    },

    onTouchStart({ touches }) {
        //  global_page.setData({
        //     displayLancet:true
        // })
        const  clientX = touches[0]['x'];
        const  clientY = touches[0]['y'];

        this.startX = clientX
        this.startY = clientY
        this.movements = [clientX, clientY];

        var that = this
        this.context = wx.createContext()
        this.context.beginPath()
        this.context.setFillStyle (that.data.paintColor) ;
        // this.context.setStrokeStyle (that.data.paintColor) ;
        // this.context.setLineWidth (2)
        this.context.moveTo(that.startX,that.startY)
        this.context.setGlobalAlpha(0.9)
        this.context.lineTo(that.movements[0],that.movements[1])
       
    },
    
    onTouchMove({ touches }) {
        const  clientX = touches[0]['x'];
        const  clientY = touches[0]['y'];
             
        //仿画吧，柳叶刀
        // switch(global_page.data.mode){
        //     case "pecile":global_page.modePecile(this,clientX,clientY);break;
        //     case "lancet":global_page.modeLancet(this,clientX,clientY);break;
        //     case "eraser":global_page.modeEraser(this);break;
        // }
        var that = this
        that.context.lineTo(clientX,clientY)
        // that.context.setLineCap("round")
        // that.context.setLineJoin("miter")
        // that.context.setMiterLimit(10)
        // this.context.setGlobalAlpha(0.8)
       
        // context.stroke();  
        that.movements = [clientX, clientY];

    },

    onTouchEnd() {
        var that = this
         that.context.fill()
        that.context.closePath()
        
        global_page.setData({context:that.context})

        this.lastActions = that.context.getActions();
        global_page.updateCanvas("paper",this._lastActions,"true");//更新画布，得出一条线
    },
   
     onLancetStart({ touches }) {

        const  clientX = touches[0]['x'];
        const  clientY = touches[0]['y'];
        this.startX = clientX
        this.startY = clientY
        this.movements = [clientX, clientY];
       
       //记录柳叶刀坐标
        point_lancet = []
        point_lancet.push([this.startX, this.startY])
        point_lancet.push([clientX, clientY])

        // global_page.setData({
        //     displayLancet:true
        // })
 

        
        context_1 = wx.createContext()
        context_1.beginPath()
        context_1.setFillStyle ('#008000') ;
        context_1.setStrokeStyle ('#008000') ;
        context_1.setGlobalAlpha(0.5)
        context_1.setLineWidth (2)
        context_1.moveTo(point_lancet[0][0],point_lancet[0][1])
        context_1.fill()
    },
    
    onLancetMove({ touches }) {
        const  clientX = touches[0]['x'];
        const  clientY = touches[0]['y'];
        global_page.modeLancet(this,context_lancet,clientX,clientY)

        //第三种方法
        // context_1.lineTo(point_lancet[i][0],point_lancet[i][1])
        // context_1.closePath()

        // 把当前的记录全画出来
        // var _context = wx.createContext()
        // _context.beginPath()
        // _context.setFillStyle ('#008000') ;
        // _context.setStrokeStyle ('#008000') ;
        // _context.setGlobalAlpha(0.5)
        // _context.setLineWidth (2)
        // _context.moveTo(point_lancet[0][0],point_lancet[0][1])
        // for (var i=1;i<point_lancet.length;i++)
        //     _context.lineTo(point_lancet[i][0],point_lancet[i][1])
        // _context.fill()
        // _context.stroke();  
        // _context.closePath()
        // this.movements = [clientX, clientY];//记录上一个点
        // this.lastActions = _context.getActions();

        
        this.movements = [clientX, clientY];//记录上一个点
        this.lastActions = context_lancet.getActions();
        point_lancet.push([clientX, clientY])//柳叶刀记录
        // wx.drawCanvas({ canvasId: "paper-lancet", actions:this.lastActions});
        // this.updateCanvas("paper-lancet",this.lastActions,"false");//更新画布，得出一条线
       this.updateCanvas("paper-lancet",this.lastActions,"true");//更新画布，得出一条线
        
    },

    onLancetEnd() {   
      
        var _context = wx.createContext()
        _context.beginPath()
        _context.setFillStyle ('#008000') ;
        _context.setStrokeStyle ('#008000') ;
        _context.setGlobalAlpha(0.5)
        _context.setLineWidth (2)
        _context.moveTo(point_lancet[0][0],point_lancet[0][1])
        for (var i=1;i<point_lancet.length;i++)
            _context.lineTo(point_lancet[i][0],point_lancet[i][1])
        _context.fill()
        // _context.stroke();  
        _context.closePath()

        var _lastActions = _context.getActions();
        global_page.updateCanvas("paper",_lastActions,"true");//更新画布，得出一条线
        // global_page.setData({
        //     displayLancet:false
        // })
   },


    getAngle(arc) {  
        return Math.PI * (arc / 180);  
    } , 
    updateCanvas(canvasId,actions,reserve) {
        // console.log(actions)
        wx.drawCanvas({ canvasId: canvasId, actions,reserve:reserve}); //wx自带绘图接口
    },

    canvasIdErrorCallback: function (e) {
        console.error(e.detail.errMsg);
    },

     save(){
        // var src = wx.canvasToTempFilePath({ canvasId: 'paper'})
        // console.log(src)
        wx.toTempFilePath({
            canvasId: 'paper',
            success: function (res) {
                console.log(res)
            },
            fail: function (res) {
                console.log(res)
            }
        })
    },
    onLoad({ paintId }) {
        global_page = this
        // context = wx.createContext()
        context_lancet = wx.createContext() 
        // const context = wx.createContext();//创建空白画布
    },
    
    // onReady: function (e) {
    // // //使用wx.createContext获取绘图上下文context
    // // var context = wx.createContext();
    //     context.beginPath()

    //     // context.stroke()
    //     context.setFillStyle ("#ff0000") ;
    //     context.setGlobalAlpha(0.4)
    //     // context.setStrokeStyle ("#ff0000") ;
    //     // context.setLineWidth (20)
    //     context.moveTo(160,100)
    //     context.lineTo(200,100)
    //     context.lineTo(200,200)
    //     context.lineTo(220,300)
    //     context.lineTo(230,210)

    // //     // context.arc(100,100,20,
    // //     // global_page.getAngle(100), global_page.getAngle(200),
    // //     //     true);  
    // //     // context.moveTo(140,100);  
    // //     // context.arc(100,100,40,0,Math.PI,false);  
    // //     // context.moveTo(85,80);  
    // //     // context.arc(80,80,5,0,2*Math.PI,true);  
    // //     // context.moveTo(125,80);  
    // //     // context.arc(120,80,5,0,2*Math.PI,true);  
    //     context.fill()
    // //     // context.stroke();  
    //     context.closePath()
    // //     //调用wx.drawCanvas，通过canvasId指定在哪张画布上绘制，通过actions指定绘制行为
    // //     wx.drawCanvas({
    // //     canvasId: "paper",
    // //     actions: context.getActions() //获取绘图动作数组
    // //     });
    // },



});





    //[start, ...moves] 
    //http://www.jdon.com/idea/js/ecmascript-rest-spread.html

    // (x) => x + 6
    // 相当于
    // function(x){
    //     return x + 6;
    // }

    //let 允许把变量的作用域限制在块级域中。
    //与 var 不同处是：var 申明变量要么是全局的，要么是函数级的，而无法是块级的
    //https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let

    
    //const 声明创建一个只读的常量。这不意味着常量指向的值不可变，而是变量标识符的值只能赋值一次。
    //JavaScript中的常量和Java，C++中的常量一个意思。注意区分常量的值和常量指向的值的不同
    //https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const









    //  onTouchStart({ touches }) {
    //     const  clientX = touches[0]['x'];
    //     const  clientY = touches[0]['y'];
    //     this.movements = [clientX, clientY];
        
    //     // context.beginPath()
    //     // context.moveTo(this.movements[0],this.movements[1]);
    // },
    
    // onTouchMove({ touches }) {
    //     // const { clientX, clientY } = touches[0]; 
    //     const  clientX = touches[0]['x'];
    //     const  clientY = touches[0]['y'];
    //     // this.movements.push([clientX, clientY]); //this.movements记录所有touch数据
    //     const [start, ...moves] = this.movements; 
        
    //     // context = global_page.data.context
    //     // context.save();

        

    //     context.moveTo(this.movements[0],this.movements[1]);
    //     context.lineTo(clientX,clientY);
    //     console.log(this.data.paintColor);
    //     context.setStrokeStyle(this.data.paintColor);
    //     context.setLineWidth(5);
    //     context.setLineCap("round")
    //     context.stroke();
    //     context.restore();
        
        

        
        
    //     this.movements = [clientX, clientY];
    //     this.lastActions = context.getActions();
    //     this.updateCanvas(this.lastActions);//更新画布，得出一条线
    // },

    // onTouchEnd() {
        
    // },
   