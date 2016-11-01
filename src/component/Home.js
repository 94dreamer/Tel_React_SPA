import React, { Component } from 'react';
import { connect } from 'react-redux';

import Page1Top from './Page1Top';
import Page1Middle from './Page1Middle';
//import './App.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    /*let home={<Page1Middle {...this.state} />}*/
    return (
      <div>
        home
        <Page1Top />
      </div>
    )
  }
}

/*// 基于全局 state ，哪些是我们想注入的 props ?
// 注意：使用 https://github.com/reactjs/reselect 效果更佳。
function select(state) {
  return {
    resultDate: state.resultDate,
    telAgent: state.telAgent,
    workParam: state.workParam
  };
}*/
export default Home;
