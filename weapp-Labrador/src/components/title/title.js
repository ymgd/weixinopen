import wx from 'labrador';
import randomColor  from '../../utils/random-color';

const { string } = wx.PropTypes;

export default class Title extends wx.Component {

  propTypes = {
    text: string
  };

  props = {
    text: ''
  };

  data = {
    text: '',
    color: randomColor()
  };

  onUpdate(props) {
    this.setData('text', props.text);
  }

  handleTap() {
    this.setData({
      color: randomColor()
    });
  }
}
