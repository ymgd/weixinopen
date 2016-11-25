import wx from 'labrador';
import Title from '../title/title';
import Item from '../item/item';
import { sleep } from '../../utils/util';

export default class List extends wx.Component {

  data = {
    items: [
      { title: 'Labrador' },
      { title: 'Alaska' }
    ]
  };

  children = {
    title: new Title({ text: 'The List Title' }),
    listItems: new wx.List(Item, 'items', {
      title: '>title',
      isNew: '>isNew',
      onChange: '#handleChange'
    })
  };

  async onLoad() {
    await sleep(1000);
    this.setData({
      items: [{ title: 'Collie', isNew: true }].concat(this.data.items)
    });
  }

  handleChange(component, title) {
    let item = this.data.items[component.key];
    item.title = title;
    this.setData('items', this.data.items);
  }
}
