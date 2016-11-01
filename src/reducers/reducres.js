import {combineReducers} from 'redux';

function telstatResult(state = {}, action) {
  switch (action.type) {
    case "telstatResult":
      return {...state, start_date: action.start_date, end_date: action.end_date}
    default:
      return state
  }
}

function uncallDetail(state = {}, action) {
  switch (action.type) {
    case "uncallDetailGet":
      return {...state, param: action.param}
    default:
      return state
  }
}
function TEL_AGENT(state = {}, action) {
  switch (action.type) {
    case "uncallDetailGet":
      return {...state, param: action.param}
    default:
      return state
  }
}
function WORK_PARAM(state = {}, action) {
  switch (action.type) {
    case "uncallDetailGet":
      return {...state, param: action.param}
    default:
      return state
  }
}


const telApp = combineReducers({//合并reducers函数
  telstatResult,
  uncallDetail,
  TEL_AGENT,
  WORK_PARAM
});
export default telApp;
