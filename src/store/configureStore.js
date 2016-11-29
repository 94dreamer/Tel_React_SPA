/**
 * Created by zz on 2016/11/7.
 */
/*
if(process.env.NODE_ENV==='production'){
  module.exports=require('./configureStore.prod');
}else{
  module.exports=require('./configureStore.dev');
}
*/
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

const enhancer = compose(
  // 你想在开发环境使用的Middleware:
  applyMiddleware(d1, d2, d3),
  // 这是必需的! 使用你选择的附带monitors的Redux DevTools
  DevTools.instrument()
);

export default function configureStore(initialState) {
  // 注意: 只有Redux >= 3.1.0 才支持enhancer作为第三个参数.
  // 可以看 https://github.com/rackt/redux/releases/tag/v3.1.0
  const store = createStore(rootReducer, initialState, enhancer);

  // 热重载reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')/*.default if you use Babel 6+ */)
    );
  }

  return store;
}
