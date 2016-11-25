Page({
    data: {
        text: 'hello',
        money: 30,
        moneyMin: 0,
        moneyMax: 100,
        moneyStep: 1,
        edit: true
    },
    sliderChange: function ( e ) {
        this.setData({
            money: e.detail.value
        })
    },
    switchMoneyState: function ( e ) {
        this.sliderChange( e );
    }
})