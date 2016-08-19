import React, { Component } from 'react';
import Page1Top from './component/Page1Top';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      level:window.xkTel.level,//1代表销售，0代表经理
      isCallCenter:window.xkTelInfo.isCallCenter//是否是呼叫中心
    }
  }

  render() {
    return (
      <section className="r-c g-lastu">
        <header id="tel-bar" className="telemarket-hd clearfix" style={{position: "relative"}}>
          <a className="bkl dn"><em className="ico-n"></em>保存并退出</a>
        </header>
        <Page1Top level={this.state.level} isCallCenter={this.state.isCallCenter} />
      </section>
    );
  }
}

export default App;