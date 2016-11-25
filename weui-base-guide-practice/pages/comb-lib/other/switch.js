module.exports = {
    toogle(id, page){
        let switches = page.data.switches
        let sw = switches.find(function(sw){
            return sw.id === id
        })
        sw.checked = !sw.checked
        if(sw.checked){
            sw.label = '开启中'
        } else {
            sw.label = '关闭'
        }

        return switches
    }
}