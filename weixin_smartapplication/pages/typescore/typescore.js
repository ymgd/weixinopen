//logs.js
var score = require('../tennis/tennis.score.js')
var transform = require('typescore.transform.js')
Page({
    data: {
        resScore: "",
        scoreA: "",
        scoreB: ""
    },
    onLoad: function () {

    },
    typeScore: function (e) {
        console.log(this.data.scoreA)
        console.log(this.data.scoreB)
        /*score filter start */
        if(!transform.validate(this.data.scoreA, this.data.scoreB)){
            this.setData({
                resScore: "Input invalid"
            })
            return
        }
        /*score filter end */
        var tennisScore = score.score2Love(this.data.scoreA, this.data.scoreB)
        this.setData({
            resScore: tennisScore
        })
    },
    bindScoreA: function (e) {
        this.setData({
            scoreA: e.detail.value
        })
    },
    bindScoreB: function (e) {
        this.setData({
            scoreB: e.detail.value
        })
    },
})
