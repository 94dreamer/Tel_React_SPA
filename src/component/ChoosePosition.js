/**
 * Created by zz on 2016/10/28.
 */
import React,{Component} from 'react';
import ChoosePositionHover from './ChoosePositionHover';
export default class ChoosePosition extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="item">
        <div className="position clearfix" style="display: block;">
          <h2 className="fl" >城区板块：</h2>
          <a href="javascript:void(0);" data-type="district" className="onend" >全部</a>
          {block.map(b=><a href="javascript:void(0);" data-type="district"  data-json="<%=JSON.stringify(block[i].block)%>" data-id="<%=block[i].id%>">{n.name}<i></i></a>)}
        </div>
        <!--悬浮标签-->
        <div className="line-list dn" style="display: block;">
          <ChoosePositionHover />
        </div>
      </div>
    )
  }
}