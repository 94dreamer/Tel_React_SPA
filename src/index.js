import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory,IndexRoute}from 'react-router'
import App from './App';
import Home from './component/Home';
import Work from './component/Work';
import User from './component/User';
//import './index.css';

ReactDOM.render(
  <App page={1} />,
  document.getElementById("APP")
)

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/work" component={Work}/>
      <Route path="/user" component={User}/>
    </Route>
  </Router>,
  document.getElementById("APP")
)