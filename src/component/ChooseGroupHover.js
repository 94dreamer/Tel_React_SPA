/**
 * Created by zz on 2016/10/28.
 */
import React,{Component} from 'react';

export default class ChooseGroupHover extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="choose group_div">
        <a href="javascript:void(0);" data-type="group" className="onend" >全部</a>
        {this.props.group.map(item=><a href="javascript:void(0);"  data-type="group" data-id={item.id} key={item.id}>{item.name}</a>)}
      </div>
    )
  }
}
