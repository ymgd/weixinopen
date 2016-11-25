const $image_path = "../../../assets/images/"

Page({
    data: {
        chevron_png: { src: $image_path + 'chevron.png'},
        form: {
            items: [
                {id: 1, label: '付款金额', value: '¥2400.00', style_class: 'total-amount'},
                {id: 2, label: '商品', value: '电动打蛋机'},
                {id: 3, label: '汇率', value: '1HKD=0.84852CNY'},
                {id: 4, label: '商户名称', value: '微信支付'},
                {id: 5, label: '当前状态', value: '支付成功'},
                {id: 6, label: '交易时间', value: '2015-09-14  01:02:21'},
                {id: 7, label: '支付方式', value: '招商银行储蓄卡'},
                {id: 8, label: '交易单号', value: '121718910134150928210680762'},
                {id: 9, label: '商户单号', value: '121789101201509235667375344'}
            ]
        },
        button: {
            content: '操作',
            disabled: false
        }
    }
})