var $image_path = "../../../assets/images/"

Page( {
    data: {
        tabs: [
            {id: 'tab-1', name: '排序一', current: 'current', sort_type: ''},
            {id: 'tab-2', name: '排序二', current: '', sort_type: ''},
            {id: 'tab-3', name: '排序三', current: '', sort_type: ''},
        ]
    },

    tabTap: function(e){
        var tabs = this.data.tabs;
        var tab_id = e.currentTarget.id;
        tabs.forEach(function(tab){
            if(tab.id == tab_id){
                tab.current = 'current'
                if(tab.sort_type === '' || tab.sort_type === 'down'){
                    tab.sort_type = 'up'
                } else {
                    tab.sort_type = 'down'
                }
            } else {
                tab.current = ''
                tab.sort_type = ''
            }
        })
        this.setData({tabs: tabs})
    }
})