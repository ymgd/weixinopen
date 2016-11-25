/**
 * 判断目标是否是函数
 * @param {mixed} val
 * @returns {boolean}
 */
function isFunction( val ) {
  return typeof val === 'function';
}

/**
 * 计算起止日期共计多少天数
 */
function GetDateDiff(startDate,endDate,split)
{
	if(split == "-")
	{
		var tmpStartDate = ""+startDate+"";
		var tmpEndDate = ""+endDate+"";
		var startTime = new Date(Date.parse(tmpStartDate.replace(/-/g, "/"))).getTime();
		var endTime = new Date(Date.parse(tmpEndDate.replace(/-/g, "/"))).getTime();			
	}
	else
	{
		var tmpStartDate = ""+startDate+"";
		var tmpEndDate = ""+endDate+"";
		var startTime = new Date(Date.parse(tmpStartDate.replace(/,/g, "/"))).getTime();
		var endTime = new Date(Date.parse(tmpEndDate.replace(/,/g, "/"))).getTime();
	}
	var dates = Math.abs((startTime - endTime))/(1000*60*60*24);
	return (dates+1);
} 

module.exports = {
  isFunction: isFunction,
  GetDateDiff: GetDateDiff
}
