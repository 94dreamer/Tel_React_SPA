/**
 * Created by zz on 2016/11/7.
 */
import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import telApp from '../reducers/reducres';
import DevTools from '../containers/DevTools';

const enhancer = compose(
  applyMiddleware(thunk),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
);

export default function configureStore(initialState) {
  const store = createStore(telApp, initialState, enhancer);

  return store;
}