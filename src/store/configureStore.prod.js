/**
 * Created by zz on 2016/11/7.
 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import telApp from '../reducers/reducres';

const enhancer = applyMiddleware(thunk);

export default function configureStore(initialState) {
  return createStore(telApp, initialState, enhancer);
}