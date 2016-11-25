//tennis.js
var score = require("tennis.score.js");

var app = getApp()
Page({
  data: {
    persent: 100,
    resArray: [],
    pass: 0,
    notpass: 0
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this

    /*testcase start */


    assert(0, 0, "Love All", that)
    assert(1, 1, "Fifteen All", that)
    assert(2, 2, "Thirty All", that)
    assert(3, 3, "Deuce", that)
    assert(4, 4, "Deuce", that)
//-------------------------------------------------------

    assert(1, 0, "Fifteen Love", that)
    assert(2, 0, "Thirty Love", that)
    assert(3, 0, "Forty Love", that)
    assert(4, 0, "A Win", that)
    assert(2, 1, "Thirty Fifteen", that)
    assert(4, 3, "A Advantage", that)
    assert(5, 3, "A Win", that)
    
    // assert(0, 0, "Love All", that)
    // assert(4, 0, "A Win", that)
    // assert(4, 3, "A Advantage", that)
    // assert(3, 3, "Deuce", that)
    // assert(2, 1, "Thirty Fifteen", that)
    // assert(4, 4, "Deuce", that)
    // assert(5, 3, "A Win", that)
    // assert(2, 2, "Thirty All", that)
    // assert(3, 0, "Forty Love", that)
    // assert(2, 0, "Thirty Love", that)
    //     assert(1, 0, "Fifteen Love", that)







    //assert(0,0, "Love All", that)

    /*testcase end */

  },

})

function assert(scoreA, scoreB, expectV, currentpage) {
  if (expect(score.score2Love(scoreA, scoreB), expectV)) {
    setresArray(scoreA, scoreB, expectV, true, currentpage)
  } else {
    setresArray(scoreA, scoreB, expectV, false, currentpage)
  }
  //setresArray(scoreA, scoreB, expectV, expect(score.score2Love(scoreA, scoreB), expectV), currentpage)
}

function expect(actualV, expectV) {
  if (actualV === expectV) {
    return true;
  } else {
    return false;
  }
}

function setresArray(scoreA, scoreB, expectV, key, currentpage) {
  currentpage.data.resArray = currentpage.data.resArray.concat([{ key: key, value: scoreA + '比' + scoreB + '->[' + expectV + ']' }])
  currentpage.setData({
    resArray: currentpage.data.resArray
  })
  if (!key) {
    currentpage.data.persent = currentpage.data.persent - 10
    currentpage.setData({
      persent: currentpage.data.persent,
      notpass: currentpage.data.notpass + 1
    })
  } else {
    currentpage.setData({
      pass: currentpage.data.pass + 1
    })
  }
}