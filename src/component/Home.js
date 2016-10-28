import React, { Component } from 'react';
import Page1Top from './Page1Top';
import Page1Middle from './Page1Middle';
//import Page1Bottom from './Page1Bottom';
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
    return (
        <div>
          <Page1Top {...this.state} />
          <Page1Middle {...this.state} />
          /*<Page1Bottom {...this.state} />*/
        </div>
    )
  }
}

export default Home;