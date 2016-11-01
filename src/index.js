import React,{PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {Router,Route,hashHistory,browserHistory,IndexRoute} from 'react-router'
import App from './component/App';
import Home from './component/Home';
import Work from './component/Work';
import User from './component/User';
import telApp from './reducers/reducres';

const store = createStore(telApp, {TEL_AGENT: {name:"周振",total:10}, WORK_PARAM: {work_type:"uncall"}});

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/work" component={Work}/>
        <Route path="/user" component={User}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById("APP")
);
