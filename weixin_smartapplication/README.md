# weixin_smartapplication
微信小程序TDD示例代码

pages/tennis: tennis题目练习的简易TDD测试程序，只能满足当前tennis的单元测试，而且只有deep equals功能（A === B）的断言

pages/wxassert: 通用的单元测试程序，目前只有deep equals功能（A === B）的断言

pages/typescore: 一个真正的，简单的微信小程序，输入比分A和B，调用tennis的函数，输出比分结果。其中对输入比分A和B的各种情况的判断，
可以作为单元测试的范围进行，可以使用wxassert进行单元测试，例如：

[wxassert.js]

//单元测试功能函数调用，得到实际值

var test_string_value = transform.validate("scorea","scoreb")

//调用单元测试assert函数，进行实际值，和期望值的判断，that是小程序当前页面的引用，最后一个参数是当前测试用例的描述

assert(test_string_value, false, that, "string value filter")


