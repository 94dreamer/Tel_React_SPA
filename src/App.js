import React, { Component } from 'react';
import Page1Top from './component/Page1Top';
import Page1Bottom from './component/Page1Bottom';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: window.xkTel.level,//1代表销售，0代表经理
      isCallCenter: window.xkTelInfo.isCallCenter,//是否是呼叫中心
      jobid:window.xkTel.jobid,
      login_jobid:window.xkTel.login_jobid
    }
  }

  render() {
    return (
      <div className="main-layout g-line">
        <aside className="l-s">
        </aside>
        <section className="r-c g-lastu">
          <header id="tel-bar" className="telemarket-hd clearfix" style={{position: "relative"}}>
            <a className="bkl dn"><em className="ico-n"></em>保存并退出</a>
          </header>
          <Page1Top {...this.state} />
          <Page1Bottom {...this.state} />
        </section>
      </div>
    );
  }
}

export default App;