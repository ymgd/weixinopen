var $image_path = "../../../assets/images/"

Page({
    data: {
        search_png: {src: $image_path + "search.png"},
        input: {
            placeholder: {
                hidden: ''
            },
            focus: 'inputFocus',
            blur: 'inputBlur',
            auto_focus: false
        }
    },

    phTap: function(e){
        var input = this.data.input
        input.placeholder.hidden = 'hidden'
        //input.auto_focus = true
        this.setData({input: input})
    },

    inputFocus: function(e){
        var input = this.data.input
        input.placeholder.hidden = 'hidden'
        this.setData({input: input})
    },

    inputBlur: function(e){
        var input = this.data.input      
        if(!e.detail.value){
            input.placeholder.hidden = ''
            this.setData({input: input})
        }
        
    }
})