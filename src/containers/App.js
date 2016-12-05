/**
 * Created by zz on 2016/12/5.
 */
import React,{Component} from 'react';
import {Router,Route,Link,hashHistory,browserHistory,IndexRoute} from 'react-router';
import Top from '../component/Top';
import Home from '../component/Home';
import Work from '../component/Work';
import Users from '../component/Users';
import User from '../component/User';
import telApp from '../reducers/reducres';

export  default class App extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Top}>
          <IndexRoute component={Home}/>
          <Route path="/work" component={Work}/>
          <Route path="/users" component={Users}>
            <Route path="/user/:userId" component={User}/>
          </Route>
        </Route>
      </Router>
    )
  }
}