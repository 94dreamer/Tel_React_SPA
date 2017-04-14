/**
 * Created by zz on 2016/10/28.
 */
import React,{Component} from 'react';
import ChooseGroupHover from './ChooseGroupHover';

export default class ChooseGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: null
    }
  }

  render() {
    var arr = [];
    for (var i in this.props.group) {
      arr.push(
        <a href="javascript:void(0);" data-type="parent" data-json={JSON.stringify(this.props.group[i].group)} data-id={this.props.group[i].id} key={this.props.group[i].id}><i></i>{this.props.group[i].name}
        </a>)
    }
    return (
      <div className="item">
        <div className="position clearfix">
          <h2 className="fl">所属部组：</h2>
          <a href="javascript:void(0);" data-type="parent" className="onend">全部</a>
          {arr}
        </div>
        {this.state.current ?
          <div className="line-list">
            <ChooseGroupHover {...this.props.group[this.state.current]} />
          </div> : null
        }
      </div>
    )
  }
}
