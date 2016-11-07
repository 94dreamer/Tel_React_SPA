/**
 * Created by zz on 2016/11/7.
 */
import {createStore} from 'redux';
import  rootReducer from '../reducers';

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState);
}