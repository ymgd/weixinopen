function isFunction(func){
  if(typeof func === 'function'){
    return true;
  }else{
    return false;
  }
}

module.exports = {
  isFunction: isFunction
}
