function check(sw){
    sw.checked = "checked"
    sw.label = "开启中"
}

function uncheck(sw){
    sw.checked = ""
    sw.label = "关闭"
}

function op(sw, value){
    if(value === true){
        check(sw)
    } else {
        uncheck(sw)
    }

    return sw
}

module.exports = {
  op: op
}