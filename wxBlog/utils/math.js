//2016.11.9
var imath=importMath();
//------------------------------------------------------------------------------数学函数------------------------------------------------------------------------------	
function importMath(){
	var math={};
	
	//获得范围内随机整数
	math.randomRange=function(min, max) {
		var randomNumber;
		randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
		return randomNumber;
	}//end func 

	//随机打乱一个数组
	math.randomSort=function(ary) {
		if(ary && ary.length>1) ary.sort(function () { return 0.5 - Math.random() });
	}//end func 
	
	//随机正负
	math.randomPlus=function() {
		return Math.random()<0.5?-1:1;
	}//end func 
	
	//等比缩放,分cover模式和contain模式
	math.autoSize=function(aryNum,aryMax,cover){
		cover=cover||0;
		var aryNow=new Array()
		var aryRate= aryNum[0]/aryNum[1];
		aryNow[0] = aryMax[0];
		aryNow[1] = Math.round(aryNow[0]/aryRate);
		if(cover){
			if(aryNow[1]<aryMax[1]){
				aryNow[1]=aryMax[1];
				aryNow[0]=Math.round(aryNow[1]*aryRate);
			}//end if
		}//end if
		else{
			if(aryNow[1]>aryMax[1]){
				aryNow[1]=aryMax[1];
				aryNow[0]=Math.round(aryNow[1]*aryRate);
			}//end if
		}//end else
		return aryNow;
	}//end func
	
	//缓动函数
	math.ease=function(_now,_tar,_speed,_space){
		_speed=_speed||10;
		_space=_space||0.1;
		var _dis=_tar-_now;
		if(Math.abs(_dis)>_space) return _dis/_speed+_now;
		else return _tar;
	}//end func
	
	//角度转弧度
	math.toRadian=function(degree) {
		return degree * Math.PI / 180;
	}//end func 
	
	//弧度转角度
	math.toDegree=function(radian) {
		return radian / Math.PI * 180;
	}//end func 
	
	//获得2点之间的距离
	math.getDis=function(pos1,pos2){
		var lineX=pos2[0]-pos1[0];
		var lineY=pos2[1]-pos1[1];
		return Math.sqrt(Math.pow(Math.abs(lineX),2)+Math.pow(Math.abs(lineY),2));
	}//end func 
	
	//获得2点之间的夹角
	math.getDeg=function(pos1,pos2){
		var deg;
		if(pos1[0]==pos2[0] && pos1[1]==pos2[1]){deg=0;}
		else{
			var dis_y=pos2[1]-pos1[1];
			var dis_x=pos2[0]-pos1[0];	
			deg=Math.atan(dis_y/dis_x)*180/Math.PI;
			if (dis_x<0) {deg=180+deg;}
			else if (dis_x>=0 && dis_y<0) {deg=360+deg;}
		}//end else
		return deg;
	}//end func
	
	//测试2个jquery对象是否重合
	math.hitTest=function(source,target,scaleX,scaleY){
		scaleX=scaleX!=null?scaleX:1;
		scaleY=scaleY!=null?scaleY:1;
		if(source && target){
			var pos1=[source.offset().left+source.outerWidth()*scaleX/2,source.offset().top+source.outerHeight()*scaleY/2];
			var pos2=[target.offset().left+target.outerWidth()*scaleX/2,target.offset().top+target.outerHeight()*scaleY/2];
			var disX=Math.abs(pos2[0]-pos1[0]);
			var disY=Math.abs(pos2[1]-pos1[1]);
			var disXMin=(source.outerWidth()+target.outerWidth())*scaleX/2;
			var disYMin=(source.outerHeight()+target.outerHeight())*scaleY/2;
			if(disX<=disXMin && disY<=disYMin) return true;
		}//end if
		else return false;
	}//end func
	
	//测试2个带data().x,data().y的jquery对象是否重合
	math.hitObject=function(source,target){
		if(source && target){
			var pos1=[source.data().x+source.outerWidth()/2,source.data().y+source.outerHeight()/2];
			var pos2=[target.data().x+target.outerWidth()/2,target.data().y+target.outerHeight()/2];
			var disX=Math.abs(pos2[0]-pos1[0]);
			var disY=Math.abs(pos2[1]-pos1[1]);
			var disXMin=(source.outerWidth()+target.outerWidth())/2;
			var disYMin=(source.outerHeight()+target.outerHeight())/2;
			if(disX<=disXMin && disY<=disYMin) return true;
		}//end if
		else return false;
	}//end func
	
	//测试一个点和一个DOM对象是否重合
	math.hitPoint=function(source,target,scaleX,scaleY){
		scaleX=scaleX!=null?scaleX:1;
		scaleY=scaleY!=null?scaleY:1;
		if(source && target){
			var area=[target.offset().left,target.offset().left+target.outerWidth()*scaleX,target.offset().top,target.offset().top+target.outerHeight()*scaleY];
			if(source[0]>=area[0] && source[0]<=area[1] && source[1]>=area[2] && source[1]<=area[3]) return true;
			else return false;
		}//end if
		else return false;
	}//end func
	
	
	//把一个数组转成数字
	math.arrayToInt=function(ary){
		var num=0;
		for(var i=0; i<ary.length; i++){
			num+=ary[i]*Math.pow(10,(ary.length-1-i));
		}//end for
		return num;
	}//end func
	
	//对array和object对象的深度复制
	math.deepClone=function(source){
		
		return getClone(source);
        
        function getClone(_source){
            var clone=getType(_source)=="array"?[]:{};
             for(var i in _source){
                if(getType(_source[i])!='object' && getType(_source[i])!='array')  clone[i]=_source[i];
                else clone[i]=getClone(_source[i]);
            }//end for
            return clone;
        }//edn func
		
		function getType(o){
			if(typeof(o)==='object') return Array == o.constructor?'array':'object';
	    	else return null;
		}//end func
		
	}//end func
	
	
	//获得Object的长度
	math.objectLength=function(obj){
		return Object.keys(obj).length;
	}//end func
	
	//将数字格式化
	math.formatNumber=function(value){
		value = value.toString(); 
	    if (value.length <= 3) { 
	        return value; 
	    } else { 
	        return this.formatNumber(value.substr(0, value.length - 3)) + ',' + value.substr(value.length - 3); 
	    }
	}//end func
	
	//截取小数点后几位，非四舍五入
	math.float=function(value,pt){
		pt=pt||2;
		value = value.toString();
		if(value.indexOf('.')==-1) return value;
		else{
			var str1=value.split('.');
			var str2=str1[0]+'.'+str1[1].substr(0,pt);
			return Number(str2);
		}//end else
	}//edn func
	
	return math;
	
	//为Array添加Contains方法
	Array.prototype.contains = function(obj) {
	    var i = this.length;
	    while (i--) {
	        if (this[i] === obj) {
	        return true;
	        }
	    }
	    return false;
	}//end func
	
}//end import

module.exports = {
  imath : imath
}