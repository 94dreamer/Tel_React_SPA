import React,{PropTypes} from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store/configureStore';
import Root from './containers/Root';

console.log("环境变量", process.env.NODE_ENV);

const initialState = {
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

const store = configureStore(initialState);

ReactDOM.render(
  <Root store={store}/>,
  document.getElementById("APP")
);
