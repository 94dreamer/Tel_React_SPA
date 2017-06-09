/**
 * Created by zz on 2016/12/5.
 */
import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,//会渲染它里面的第一个可以匹配的
} from 'react-router-dom';

import {ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

import Bundle from '../component/common/bundle';
// 异步引入
import Home from 'bundle-loader?lazy&name=[name]!../containers/Home';
const HomePage = () => (
  <Bundle load={Home}>
    {(Home) => <Home/>}
  </Bundle>
);

import Work from 'bundle-loader?lazy&name=[name]!../containers/Work';
const WorkPage = () => (
  <Bundle load={Work}>
    {(Work) => <Work/>}
  </Bundle>
);

import Record from 'bundle-loader?lazy&name=[name]!../containers/Record';
const RecordPage = (props) => {
  return (
    <Bundle load={Record}>
      {(Record) => <Record {...props} />}
    </Bundle>
  )
};
import NoMatch from '../component/NoMatch';

const App = (props) => {
  console.warn(props);
  return (
    <ConnectedRouter history={history}>
      {/*<Router>*/}
        <Switch>
          <Route exact path="/saletel/list/" component={HomePage}/>
          <Route path="/saletel/list/work/" component={WorkPage}/>
          <Route path="/saletel/list/record/" component={RecordPage}/>
          <Route component={NoMatch}/>
        </Switch>
      {/*</Router>*/}
    </ConnectedRouter>
  )
};

export default App;
