/*链接和参数*/
function createURL( url, obj ) {
  let props = "";
  let resultURL="";  
  for(let p in obj){  
    if(obj[p])
    props+= "&"+p + "=" + obj[p];  
  }
  resultURL=url+"?"+props.substr(1);
  console.log(resultURL);
  return resultURL;  
}

module.exports = {
  createURL: createURL
}