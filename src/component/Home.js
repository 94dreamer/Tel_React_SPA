import React, { Component } from 'react';

import Page1Top from './page1/Page1Top';
import Page1Middle from './page1/Page1Middle';
import Page2Top from './page2/EnterMain';
import Page2Middle from './page2/Page2Middle';
//import './App.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    }
  }

  render() {
    return (
      this.state.page == 1 ?
        <div>
          <Page1Top />
          <Page1Middle />
        </div> :
        <div>
          <Page2Top />
          <Page2Bottom />
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
