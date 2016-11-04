import {combineReducers} from 'redux';

function page(state = 1, action) {
  switch (action.type) {
    case "CHANGE_page":
      return action.page || state;
    default:
      return state;
  }
}

function queuenum(state=0,action) {
  switch (action.type){
    case "CHANGE_queuenum":
      return action.queuenum
    default:
      return state
  }
}

function callnum(state=0,action) {
  switch (action.type){
    case "CHANGE_callnum":
      return action.callnum
    default:
      return state
  }
}

function callblock(state = "uncall", action) {
  switch (action.type) {
    case "CHANGE_callblock":
      return action.block || state;
    default:
      return state;
  }
}

function resultDate(state = {}, action) {
  switch (action.type) {
    case "CHANGE_resultDate":
      return {...state, min: action.min, max: action.max}
    default:
      return state
  }
}

function uncallData(state = {}, action) {
  switch (action.type) {
    case "ADD_uncallData":
      return {...state, [action.param.type]: action.param.value}
    case "DEL_uncallData":{
      const newState = {...state};
      delete newState[action.param.type];
      return newState
    }
    default:
      return state
  }
}

function calledData(state = {}, action) {
  switch (action.type) {
    case "ADD_calledData":
      return {...state, [action.param.type]: action.param.value}
    case "DEL_calledData":
    {
      const newState = {...state};
      delete newState[action.param.type];
      return newState
    }
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


const telApp = combineReducers({  // 合并reducers函数
  page,
  queuenum,
  callnum,
  callblock,
  resultDate,
  uncallData,
  calledData,
  telAgent,
  workParam
});
export default telApp;
