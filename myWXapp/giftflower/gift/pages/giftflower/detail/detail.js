Page({
    data: {
        title: "",
        imgId: null,
        imgSrc: "",
        price: "",
        bg: "#fff"
    },

    onLoad: function(pama) {
        this.setData({
            title: pama.name,
            imgId: pama.id
        })
         console.log(wx.getStorageSync("likeId"));
         var arrId=JSON.parse(wx.getStorageSync("likeId"));
         for(var i=0;i<arrId.length;i++){
            if(this.data.imgId==arrId[i]){
                this.setData({
                    bg:"red"
                })
            }
         }
         console.log(arrId)
        
/*
        if(wx.getStorage('bg')){
            this.setData({bg:wx.getStorage('bg')})
        }*/

    },

    onReady: function() {
        var hot = [{
                img: "http://img01.hua.com/uploadpic/newpic/9010877.jpg_220x240.jpg",
                name: "致美丽的你",
                price: "￥125",
                id: "0"
            }, {
                img: "http://img01.hua.com/uploadpic/newpic/9010966.jpg_220x240.jpg",
                name: "一往情深",
                price: "￥234",
                id: "1"
            }, {
                img: "http://img01.hua.com/uploadpic/newpic/9012011.jpg_220x240.jpg",
                name: "阳光海岸",
                price: "￥212",
                id: "2"
            }, {
                img: "http://img01.hua.com/uploadpic/newpic/9012147.jpg_220x240.jpg",
                name: "纯美时光",
                price: "￥126",
                id: "3"
            },

            {
                img: "http://img01.hua.com/uploadpic/newpic/9012147.jpg_220x240.jpg",
                name: "真爱如初",
                price: "￥182",
                id: "4"
            }, {
                img: "http://img01.hua.com/uploadpic/newpic/9010947.jpg_220x240.jpg",
                name: "Love 99",
                price: "￥489",
                id: "5"
            }, {
                img: "http://img01.hua.com/uploadpic/newpic/9012062.jpg_220x240.jpg",
                name: "心上人",
                price: "￥380",
                id: "6"
            }, {
                img: "http://img01.hua.com/uploadpic/newpic/9012128.jpg_220x240.jpg",
                name: "好时光",
                price: "￥224",
                id: "7"

            }

        ];
        wx.setNavigationBarTitle({
            title: this.data.title
        });
        this.setData({
            imgSrc: hot[this.data.imgId].img,
            price: hot[this.data.imgId].price
        });


    },
    colorchange: function() {
        if (this.data.bg != "red") {
            this.setData({
                bg: "red"
            })
            var a=wx.getStorageSync('likeId');
            if(a.length==0){
                var arr=[this.data.imgId];
                wx.setStorageSync("likeId",JSON.stringify(arr));
                console.log(1)
            }else{
                    var arr_=JSON.parse(wx.getStorageSync("likeId"));
                    arr_.push(this.data.imgId);
                    wx.setStorageSync("likeId",JSON.stringify(arr_));


            }

            
        } else {
            this.setData({
                bg: "#fff"
            })
              var arr_=JSON.parse(wx.getStorageSync("likeId"));
              for(var i=0;i<arr_.length;i++){
                
                if(this.data.imgId==arr_[i]){
                    console.log(arr_[i])
                    arr_.splice(i,1);
                     wx.setStorageSync("likeId",JSON.stringify(arr_));
                     console.log(wx.getStorageSync('likeId'))
                }
              }
                    
                    

        }
         
    }

})
