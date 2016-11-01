import {combineReducers} from 'redux';

function resultDate(state = {}, action) {
  switch (action.type) {
    case "CHANGE_resultDate":
      return {...state, min: action.min, max: action.max}
    default:
      return state
  }
}

function telAgent(state = {}, action) {
  switch (action.type) {
    case "NEXT_telAgent":
      return {...state, ...action.param}
    case "CLEAN_telAgent":
      return {}
    default:
      return state
  }
}
function workParam(state = {}, action) {
  switch (action.type) {
    case "CHANGE_workParam":
      return {...state, ...action.param}
    case "CLEAN_workParam":
      return {}
    default:
      return state
  }
}


const telApp = combineReducers({//合并reducers函数
  resultDate,
  telAgent,
  workParam
});
export default telApp;
