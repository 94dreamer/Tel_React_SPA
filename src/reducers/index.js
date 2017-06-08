/**
 * Created by zhouzhen on 2017/4/17.
 */
import * as reducers from './reducers';
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'

const rootReducer = combineReducers({
  ...reducers,
  router: routerReducer
});

export default rootReducer;