/**
 * Created by zz on 2016/12/5.
 */
import React, {Component} from 'react';
// import {Router,Route,Link,hashHistory,browserHistory,IndexRoute} from 'react-router';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,//会渲染它里面的第一个可以匹配的
} from 'react-router-dom';


import Home from '../containers/Home';
import Work from '../containers/Work';
import Record from '../containers/Record';
import NoMatch from '../component/NoMatch';


const App = () => (
  <Router>
    <Switch>
      <Route exact path="/saletel/list/" component={Home}/>
      <Route path="/saletel/list/work/" component={Work}/>
      <Route path="/saletel/list/record/" component={Record}/>
      <Route component={NoMatch}/>
    </Switch>
  </Router>
);

export default App;
