/**
 * Created by zz on 2016/11/7.
 */
import {createStore, applyMiddleware, compose} from 'redux';
import {persistState} from 'redux-devtools';
import ReduxThunk from 'redux-thunk'
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

import {routerMiddleware} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
const middleware = [ReduxThunk, routerMiddleware(history)];

const enhancer = compose(
  // 你想在开发环境使用的Middleware:
  applyMiddleware(...middleware),
  // 这是必需的! 使用你选择的附带monitors的Redux DevTools
  DevTools.instrument(),
  //参数，让你输入?debug_session=<key> 在地址栏中持续地debug会话
  persistState(getDebugSessionKey())
);

function getDebugSessionKey() {
  //你可以编写自定义的逻辑
  //默认情况下我们是这样输入在地址栏中的 ?debug_session=<key>
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0) ? matches[1] : null;
}

export default function configureStore(initialState) {
  // 注意: 只有Redux >= 3.1.0 才支持enhancer作为第三个参数.
  // 可以看 https://github.com/rackt/redux/releases/tag/v3.1.0
  const store = createStore(rootReducer, initialState, enhancer);

  // 热重载reducers (requires Webpack or Browserify HMR to be enabled)
  /*  if (module.hot) {
   module.hot.accept('../reducers/reducres', () =>
   store.replaceReducer(require('../reducers/reducres')/!*.default if you use Babel 6+ *!/)
   );
   }*/

  return store;
}
