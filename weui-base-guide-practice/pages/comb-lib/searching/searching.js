var $image_path = "../../../assets/images/"
var $searchTexts = [
            '星球大战',
            '星球大战原力觉醒',
            '星球大战7 上映时间',
            '星球大战7 主角',
            '星球大战7 千年鹰号',
            '星球大战全球上映时间'
        ];

Page({
    data: {
        search_png: {src: $image_path + "search.png"},
        input: {
            placeholder: {
                hidden: ''
            },
            auto_focus: false,
            cancelHidden: 'hidden',
            bindinput: 'searchInput',
            value: '',
            matchingTexts: [],
            searching: ''
        },
        clearIcon: {
            bindtap: 'cancelSearch'
        }
        
    },

    searchInput: function(e){
        var input = this.data.input
        var matching = null
        input.cancelHidden = ''
        input.searching = 'searching'
        input.value = e.detail.value
        var parsedValue = input.value.replace(/\s+/g, '')
        input.matchingTexts = $searchTexts.filter(function(text){
            if(!parsedValue){
                return false
            }
            matching = text.replace(/\s+/g, '').includes(parsedValue)
            return matching
        })
        this.setData({input: input})
    },

    cancelSearch: function(e){
        var input = this.data.input
        input.cancelHidden = 'hidden'
        input.searching = ''
        input.value = ''
        input.matchingTexts = []
        this.setData({input: input})
    },

    selectText: function(e){
        var input = this.data.input
        var text = e.currentTarget.dataset.searchText
        input.value = text
        input.matchingTexts  = []
        this.setData({input: input})
    }
})