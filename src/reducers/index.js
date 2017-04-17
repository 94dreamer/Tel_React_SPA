/**
 * Created by zhouzhen on 2017/4/17.
 */
import * as reducers from './reducres';
import {combineReducers} from 'redux';

console.log(reducers);

const rootReducer=combineReducers({...reducers});

export default rootReducer;