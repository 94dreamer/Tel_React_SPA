import {combineReducers} from 'redux';
function telstatResult(state={},action){
  switch (action.type){
    case "telstatResult":
      return {...state,start_date:action.start_date,end_date:action.end_date}
      break;
    default:
      return state
  }
}



const telApp=combineReducers({//合并reducers函数
  telstatResult,
});
export default telApp;