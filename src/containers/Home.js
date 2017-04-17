import React, {Component} from 'react';
import {connect} from 'react-redux';
import Page1Top from '../component/home/Page1Top';
import Page1Middle from '../component/home/Page1Middle';
//import './App.css';

export default class Home extends Component {
  render() {
    // const {dispatch} = this.props;
    return (
      <div>
        <Page1Top />
        <Page1Middle />
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
// function select(state) {
//   return {
//     page: state.page
//   }
// }
// export default connect(select)(Home);
