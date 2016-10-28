/**
 * Created by zz on 2016/10/28.
 */
import React,{PropTypes}from 'react';
import {Provider} from 'react-redux';
import {Router,Route,browserHistory}from 'react-router';
import App from 'App';
import Home from './component/Home';
import Work from './component/Work';
import User from './component/User';

const Root=({store})=>(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/work" component={Work}/>
        <Route path="/user" component={User}/>
      </Route>
    </Router>
  </Provider>
)

export default Root;