/**
 * Created by zz on 2016/11/3.
 */
import React,{ Component } from 'react';

export default class Record_1 extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const telAgent = this.props.telAgent;
    const workParam = this.props.workParam;
    const info=workParam.work_type==1?telAgent.queueinfo:telAgent.visitinfo;
    return (
      <div className="record_1">
        <h2><em></em>本次呼叫标识</h2>
        <div className="tag_s clearfix">
          {info.is_firstcall>0?<span className="c_blue">首次</span>:null}
          {info.is_tempassign>0?<span className="c_purple">指派</span>:null}
          {info.is_telsalevisit>0?<span className="c_orange">回访</span>:null}
          {info.is_notstandard>0?<span className="c_red">未达标</span>:null}
          {info.is_7expire>0?<span className="c_orange">7天到期</span>:null}
          {info.is_7open>0?<span className="c_green">7天开通</span>:null}
        </div>
      </div>
    )
  }
}
