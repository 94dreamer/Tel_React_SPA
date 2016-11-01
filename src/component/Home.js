import React, { Component } from 'react';
import { connect } from 'react-redux';

import Page1Top from './Page1Top';
import Page1Middle from './Page1Middle';
//import './App.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: window.xkTel.level,//1代表销售，0代表经理
      isCallCenter: window.xkTelInfo.isCallCenter,//是否是呼叫中心
      jobid: window.xkTel.jobid,
      login_jobid: window.xkTel.login_jobid
    }
  }

  render() {
    // 通过调用 connect() 注入:
    const { dispatch ,TEL_AGENT , WORK_PARAM } = this.props;
    /*let home={<Page1Middle {...this.state} />}*/
    return (
      <div>
        home
        <p>{this.props.TEL_AGENT.name}</p>
        <Page1Top {...this.state}/>
      </div>
    )
  }
}

// 基于全局 state ，哪些是我们想注入的 props ?
// 注意：使用 https://github.com/reactjs/reselect 效果更佳。
function select(state) {
  return {
    TEL_AGENT: state.TEL_AGENT,
    WORK_PARAM: state.WORK_PARAM
  };
}
export default connect(select)(Home);
