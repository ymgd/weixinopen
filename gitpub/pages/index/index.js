let githubOauthApi = "https://api.github.com";

var app = getApp()
Page({
    data: {
        isLogin: false,
        isShowAllBtn: true,
        token: "",
        allRepos: [],
        userInfo: {
            userName: "",
            userAli: "",
            company: "",
            position: "",
            email: "",
        },
        reposInfo: []
    },
    onLoad: function() {
        let token = wx.getStorageSync('token') || "";
        let aliName = wx.getStorageSync('aliName') || "";
        if (token != "" && aliName != "") {
            this.bindUserInfo(token);
        }
    },

    login: function(e) {
        if(e.detail.value.token == "") return;
        let token = e.detail.value.token;

        // console.log(token);
        this.bindUserInfo(token);

        // console.log(this.data.token);
    },

    bindUserInfo: function(token) {
        let self = this;
        wx.request({
            url: githubOauthApi + '/user', //仅为示例，并非真实的接口地址
            data: {
                access_token: token
            },
            success: function(res) {
                console.log(res.data)

                wx.setStorage({
                    key: "token",
                    data: token
                });
                wx.setStorage({
                    key: "aliName",
                    data: res.data.login
                })

                self.setData({
                    isLogin: true,
                    userInfo: {
                        userName: res.data.name,
                        userAli: res.data.login,
                        company: res.data.company,
                        position: res.data.location,
                        email: res.data.email,
                    }
                })

                self.bindReposInfo(res.data.login);
            }
        })
    },

    bindReposInfo: function(aliName) {
        let self = this;
        wx.request({
            url: githubOauthApi + '/users/' + aliName + '/repos', //仅为示例，并非真实的接口地址
            data: {
                access_token: wx.getStorageSync('token'),
                type: "owner",
                sort: "pushed"
            },
            success: function(res) {
                console.log(res.data)
                let repos = res.data.filter(function(item){
                    return !item.fork;
                })
                console.log(repos);


                self.setData({
                    reposInfo: repos.splice(0, 6)
                })

                self.data.allRepos = repos;

            }
        })
    },

    toRepos: function(e){
        console.log(e);
        console.log(this.data.reposInfo);
        wx.navigateTo({
          url: './repo/repo?description=' + this.data.reposInfo[e.currentTarget.id].description + '&repo=' + this.data.reposInfo[e.currentTarget.id].name
        })
    },

    showAll: function() {
        this.setData({
            reposInfo: this.data.reposInfo.concat(this.data.allRepos),
            isShowAllBtn: false
        })
    }

})