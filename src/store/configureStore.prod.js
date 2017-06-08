/**
 * Created by zz on 2016/11/7.
 */
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

import rootReducer from '../reducers';

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
const middleware = [ ReduxThunk,routerMiddleware(history)];

// 你想在生产环境使用的中间件
const enhancer = applyMiddleware(...middleware);

export default function configureStore(initialState) {
    // 注意: 只有Redux >= 3.1.0 才支持enhancer作为第三个参数.
    // 可以看 https://github.com/rackt/redux/releases/tag/v3.1.0
  return createStore(rootReducer, initialState, enhancer);
}