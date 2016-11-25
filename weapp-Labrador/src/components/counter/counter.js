import wx from 'labrador';

const { number, func } = wx.Types;

export default class Counter extends wx.Component {

  //属性类型
  propTypes = {
    count: number,
    onChange: func.isRequired
  };

  //默认属性值
  props = {
    count: 0
  };

  //默认data数据
  data = {
    num: 0
  };

  //监听props值的改变
  onUpdate(props) {
    if (props.count !== this.props.count) {
      //props.count 值发生了变化，更新data
      this.setData({ num: props.count * 2 });
    }
  }

  handleTap() {
    let count = this.props.count + 1;
    if (this.props.onChange) {
      this.props.onChange(count);
    }
  }
}
