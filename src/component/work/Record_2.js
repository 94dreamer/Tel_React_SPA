/**
 * Created by zz on 2016/11/3.
 */
import React,{ Component } from 'react';

export default class Record_2 extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const telAgent = this.props.telAgent;
    const workParam = this.props.workParam;
    const info = workParam.work_type == 1 ? telAgent.queueinfo : telAgent.visitinfo;
    return (
      info.is_tempassign > 0 && info.call_aim && info.call_aim.length ?
        <div className="record_2">
          <h2><em />本次呼叫目的</h2>
          <div>{info.call_aim}</div>
        </div> : null
    )
  }
}
