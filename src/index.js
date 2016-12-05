import React,{PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {Router,Route,Link,hashHistory,browserHistory,IndexRoute} from 'react-router';
//import DevTools from './containers/DevTools';
//import configureStore from './store/configureStore';
import Top from './component/Top';
import Home from './component/Home';
import Work from './component/Work';
import Users from './component/Users';
import User from './component/User';
import telApp from './reducers/reducres';

console.log("环境变量", process.env.NODE_ENV);

const initState = {
  page: 1,
  queuenum: 0,
  callnum: 0,
  callblock: "uncall",
  resultDate: {
    min: null,
    max: null
  },
  uncallData: {
    citycode: window.xkTel.citycode,// 城市编号
    jobid: window.xkTel.jobid,// 销售工号
    tel_group_id: window.xkTel.group_id,// 部组id
    callqueue: 1//呼叫队列
  },
  calledData: {
    citycode: window.xkTel.citycode,// 城市编号
    jobid: window.xkTel.jobid,// 销售工号
    tel_group_id: window.xkTel.group_id// 部组id
  },
  telAgent: {},
  workParam: {}
};
const store = createStore(telApp, initState);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Top}>
        <IndexRoute component={Home}/>
        <Route path="/work" component={Work}/>
        <Route path="/users" component={Users}>
          <Route path="/user/:userId" component={User}/>
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById("APP")
);
