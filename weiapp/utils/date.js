module.exports={
    getUTCtime:function(){
        var date = new Date();
        var str = date.getUTCFullYear()+'-'+ num2str(date.getUTCMonth()+1,2)+'-'+num2str(date.getUTCDate(),2)+'T'
            + num2str(date.getUTCHours(),2)+':'
                +num2str(date.getUTCMinutes(),2)+':'
                +num2str(date.getUTCSeconds(),2)+'Z';
        return str;
    }
}

/*数字前面补零 */
function num2str(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}