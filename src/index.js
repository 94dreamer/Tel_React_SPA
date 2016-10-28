import React from 'react';
import ReactDOM from 'react-dom';
import {createStore}from 'redux';
import {Provider}from 'react-redux';
import {Router,Route,hashHistory,IndexRoute}from 'react-router'
import App from './component/Root';
import Home from './component/Home';
import Work from './component/Work';
import User from './component/User';
//import './index.css';
import telApp from './reducers/reducres';
let store = createStore(telApp);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
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