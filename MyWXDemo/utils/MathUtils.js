
//丢弃小数部分,保留整数部分 
function getIntNumber(value){
    return parseInt(value)
}

//向上取整,有小数就整数部分加1 
function getCeilNumber(value){
    return Math.ceil(value)
}

//向下取整 
function getFloor(value){
    return Math.floor(value)
}

//四舍五入
function getRoundNumber(value){
    return Math.round(value)
}


module.exports = {
  getIntNumber: getIntNumber,
  getCeilNumber:getCeilNumber,
  getFloor:getFloor,
  getRoundNumber:getRoundNumber
}