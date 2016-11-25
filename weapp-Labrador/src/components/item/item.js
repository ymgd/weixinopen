import wx from 'labrador';

const { func, string, bool } = wx.PropTypes;

export default class Item extends wx.Component {

  propTypes = {
    title: string,
    isNew: bool,
    onChange: func.isRequired
  };

  onUpdate(props) {
    this.setData({
      title: props.title,
      cls: props.isNew ? 'item-new' : ''
    });
  }

  handleTap() {
    this.props.onChange(this.data.title + '.');
  }
}
