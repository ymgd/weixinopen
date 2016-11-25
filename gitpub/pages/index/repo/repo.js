// import markdownParser from "../../../utils/markdownParser";
// let Base64 = require('../../../utils/base64').Base64;

let githubOauthApi = 'https://api.github.com';
// let githubOauthApi = 'https://api.github.com';


var app = getApp()
Page({
    data: {
        description: "",
        repoListFile: [],
        repoListDir: [],
        readme: "",
        wxMdData: [],

    },
    onLoad: function(option) {


        console.log(option);
        let self = this;
        this.setData({
        	description: option.description
        })
        wx.request({
            url: githubOauthApi + '/repos/' + wx.getStorageSync('aliName') + '/' + option.repo + '/contents',
            data: {
                access_token: wx.getStorageSync('token')
            },
            success: function(res) {
                console.log(res);
                let repoListFile = [];
                let repoListDir = [];
                for(let i = 0; i < res.data.length; i++){
                	if(res.data[i].type == "file"){
                		repoListFile.push(res.data[i]);
                	}else{
                		repoListDir.push(res.data[i]);
                	}

                	if(res.data[i].name == "README.md"){
                		self.getCon(res.data[i].url);
                	}
                }
                self.setData({
                	repoListFile: repoListFile,
                	repoListDir: repoListDir
                })
                // self.reposInfo = res.data.filter(self.filterRepos);
                // console.log(self.reposInfo);
            }
        })
    },

    getCon: function(url){
    	wx.request({
    		url: url,
            data: {
                access_token: wx.getStorageSync('token')
            },
    		success: function(res){
                console.log(res);
       //          let parData = [];
       //          let str = "";

       //          console.log(Base64.decode(res.data.content));

       //          // for(let i = 0; i < res.data.length; i++){
       //          //     console.log(res.data[i]);
       //          //     // if(res.data[i] != "↵") {
       //          //     //     str += res.data[i];
       //          //     // }else{
       //          //     //     console.log(1111);
       //          //     //     parData.push("");
       //          //     //     parData.push(str);
       //          //     //     str = "";
       //          //     // }
       //          // }

       //          console.log(parData);


    			// console.log("↵↵");
       //          console.log(markdownParser);

    		}
    	})
    },
})