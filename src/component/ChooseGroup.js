/**
 * Created by zz on 2016/10/28.
 */
import React,{Component} from 'react';
import ChooseGroupHover from 'ChooseGroupHover';
export default class ChooseGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    var arr=[];
    for(var i in group){
      arr.push(<a href="javascript:void(0);" data-type="parent"  data-json={JSON.stringify(group[i].group)} data-id={group[i].id}><i></i>{group[i].name}</a>)
    }
    return (
      <div className="item">
        <div className="position clearfix" style="display: block;">
          <h2 className="fl" >所属部组：</h2>
          <a href="javascript:void(0);" data-type="parent" className="onend" >全部</a>
          {arr}
        </div>
        <!--悬浮标签-->
        <div className="line-list dn" style="display: block;">
          <ChooseGroupHover />
        </div>
      </div>
    )
  }
}