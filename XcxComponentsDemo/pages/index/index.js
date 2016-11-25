var util = require('../../utils/util');
// 引入子组件js
var myComponent = require('../../components/myComponent/index');

const CHILD_COMP_VAL = '子组件还没有输入内容';

var pageObj = {
  data: {
    childCompVal: CHILD_COMP_VAL
  },

  /**
   * 清空子组件内容
   */
  clearInput: function() {
    this.setData({
      childInputVal: '',
      childCompVal: CHILD_COMP_VAL
    });
  }
};

// 合并子组件data值及方法
util.mergeComponents(pageObj, myComponent);

Page(pageObj)
