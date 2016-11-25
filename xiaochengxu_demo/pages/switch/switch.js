Page({
    switch1Change(e){
        console.log('switch1发生change事件，携带值为',e.detail.value);
    },
    switch2Change(e){
        console.log('switch2发生change事件,携带值为',e.detail.value);
    }
})