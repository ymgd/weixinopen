//wxassert.js
var transform = require("../typescore/typescore.transform.js");
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
    
    /*your code start here */
    var test_null_value = transform.validate('','')
    assert(test_null_value, false, that, "null value filter1")

    var test_undefine_value = transform.validate(undefined,undefined)
    assert(test_undefine_value, false, that, "undefined value filter")
    
    var test_undefine_value = transform.validate(-1,-1)
    assert(test_undefine_value, false, that, "minus value filter")

    var test_int_value = transform.validate(2.1,3.5)
    assert(test_int_value, false, that, "int value filter")

    var test_less6_value = transform.validate(6,6)
    assert(test_less6_value, false, that, "value must less than 6 filter")

    var test_string_value = transform.validate("scorea","scoreb")
    assert(test_string_value, false, that, "string value filter")

    /*your code ends here */

  },

})

function assert(actualV, expectV, currentpage, output) {
    setresArray(expect(actualV, expectV), currentpage, output)
}

function expect(actualV, expectV) {
  if (actualV === expectV) {
    return true;
  } else {
    return false;
  }
}

function setresArray(key, currentpage, output) {
  currentpage.data.resArray = currentpage.data.resArray.concat([{ key: key, value: output }])
  currentpage.setData({
    resArray: currentpage.data.resArray
  })
  if (!key) {
    currentpage.data.persent = currentpage.data.persent - 10
    currentpage.setData({
      persent: currentpage.data.persent,
      notpass: currentpage.data.notpass + 1
    })
  }else{
    currentpage.setData({
      pass: currentpage.data.pass + 1
  })
  }
}