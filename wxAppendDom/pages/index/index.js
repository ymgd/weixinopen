

var app = getApp()
Page({
    data: {
        wxAppendData: [],
    },
    onReady: function() {
        this.data.wxAppendData = [
            {
                node: 'element',
                tag: 'view',
                class: ['a b'],
                content: '父节点',
                child: [
                    {
                        node: 'element',
                        tag: 'img',
                        class: ['a b'],
                        src: '../../img/user_hover.png',
                    },
                    {
                        node: 'element',
                        tag: 'text',
                        class: ['a b'],
                        content: "text标签",
                        child: [
                            {
                                node: 'element',
                                tag: 'text',
                                class: ['a b'],
                                content: "嵌套text标签"
                            }
                        ]
                    },
                    {
                        node: 'element',
                        tag: 'view',
                        content: 'view标签',
                    },
                ]
            },
            {
                node: 'element',
                tag: 'view',
                class: ['a b'],
                content: '父节点',
                child: [
                    {
                        node: 'element',
                        tag: 'img',
                        class: ['a b'],
                        src: '../../img/user_hover.png',
                    },
                    {
                        node: 'element',
                        tag: 'text',
                        class: ['a b'],
                        content: "text标签",
                        child: [
                            {
                                node: 'element',
                                tag: 'text',
                                class: ['a b'],
                                content: "嵌套text标签"
                            }
                        ]
                    },
                    {
                        node: 'element',
                        tag: 'view',
                        content: 'view标签',
                    },
                ]
            }
        ]
    },
    
})