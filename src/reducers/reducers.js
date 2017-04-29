//import {combineReducers} from 'redux';

// function page(state = 1, action) {
//   switch (action.type) {
//     case "CHANGE_page":
//       return action.page || state;
//     default:
//       return state;
//   }
// }
export function listNum(state = {}, action) {
  switch (action.type) {
    case "CHANGE_listNum":
      return action.value;
    default:
      return state
  }
}

export function callblock(state = "uncall", action) {
  switch (action.type) {
    case "CHANGE_callblock":
      return action.block || state;
    default:
      return state;
  }
}

export function resultDate(state = '', action) {
  switch (action.type) {
    case "CHANGE_resultDate":
      return action.value;
    default:
      return state
  }
}

export function telstatresult(state = {}, action) {
  switch (action.type) {
    case "GET_telstatresult":
      return action.value;
    default:
      return state
  }
}

/**
 * 未呼叫队列
 * */
export function uncallData(state = {}, action) {
  switch (action.type) {
    case "ADD_uncallData":
      return {...state, [action.param.type]: action.param.value}
    case "DEL_uncallData": {
      const newState = {...state};
      delete newState[action.param.type];
      return newState
    }
    default:
      return state
  }
}

export function uncallRes(state = {}, action) {
  switch (action.type) {
    case "CHANGE_uncallRes":
      return action.value;
    default:
      return state;
  }
}

export function uncallConfig(state = {}, action) {
  switch (action.type) {
    case "GET_uncallConfig":
      return action.value;
    default:
      return state;
  }
}
/**
 * 已呼叫队列
 * */
export function calledData(state = {}, action) {
  switch (action.type) {
    case "ADD_calledData":
      return {...state, [action.param.type]: action.param.value}
    case "DEL_calledData": {
      const newState = {...state};
      delete newState[action.param.type];
      return newState
    }
    default:
      return state
  }
}

export function calledRes(state = {}, action) {
  switch (action.type) {
    case "CHANGE_calledRes":
      return action.value;
    default:
      return state;
  }
}

export function calledconfig(state = {}, action) {
  switch (action.type) {
    case "GET_callconfig":
      return action.value;
    default:
      return state;
  }
}

/**
 * 锁定中队列
 * */
export function lockData(state = {}, action) {
  switch (action.type) {
    case "ADD_lockData":
      return {...state, [action.param.type]: action.param.value}
    case "DEL_lockData": {
      const newState = {...state};
      delete newState[action.param.type];
      return newState
    }
    default:
      return state
  }
}

export function telAgent(state = {}, action) {
  switch (action.type) {
    case "NEXT_telAgent":
      return {...state, ...action.param};
    case "CLEAN_telAgent":
      return {}
    default:
      return state
  }
}

export function workParam(state = {}, action) {
  switch (action.type) {
    case "CHANGE_workParam":
      return {...state, ...action.param};
    case "CLEAN_workParam":
      return {}
    default:
      return state
  }
}

export function loadNum(state = 0, action) {
  switch (action.type) {
    case "ADD_loadNum":
      return state + 1;
    case "DEL_loadNum":
      return state - 1;
    default:
      return state
  }

}


// const rootReducer = combineReducers({  // 合并reducers函数
//   // page,
//   queuenum,
//   callnum,
//   callblock,
//   resultDate,
//   uncallData,
//   calledData,
//   telAgent,
//   workParam
// });
// export default rootReducer;
