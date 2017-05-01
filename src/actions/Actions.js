/**
 * Created by zhouzhen on 2017/4/19.
 */
export function ADD_loadNum() { //加载loading显示 +1
  return {
    type: "ADD_loadNum",
  }
}

export function DEL_loadNum() { //加载loading隐藏 -1
  return {
    type: "DEL_loadNum",
  }
}

export function postData(url, data, fn, noFn, isAsync, type) {//封装Ajax
  return function (dispatch, getState) {
    if (!url) {
      return
    }
    process.env.NODE_ENV && !data.noLoad && dispatch(ADD_loadNum());
    $.ajax({
      type: data.ajaxType || type || 'GET',
      url: url,
      data: data,
      async: isAsync !== undefined ? isAsync : true,
      /*success: function (res) {
        var res = (typeof res == 'string') ? JSON.parse(res) : res;
        if (res.result.code == 0) {
          fn ? fn(res) : alert('操作成功');
        } else {
          noFn ? noFn(res) : alert(res.result.message);
        }
        process.env.NODE_ENV && !data.noLoad && dispatch(DEL_loadNum());
      }*/
    }).done((res)=>{
      var res = (typeof res == 'string') ? JSON.parse(res) : res;
      if (res.result.code == 0) {
        fn ? fn(res) : alert('操作成功');
      } else {
        noFn ? noFn(res) : alert(res.result.message);
      }
      process.env.NODE_ENV && !data.noLoad && dispatch(DEL_loadNum());
    }).fail()
  }
}
/**
 * Home页结果日期action
 */
export function CHANGE_resultDate(date) {//改变日期
  return function (dispatch, getState) {
    if (getState().resultDate === date) {
      return;
    }
    dispatch({
      type: "CHANGE_resultDate",
      value: date,
    });
    dispatch(telstatresultAjax(date));
  }
}

export function telstatresultAjax(date) {//发起ajax
  return function (dispatch, getState) {
    dispatch(postData('/saleajax/telstatresult/', {
      citycode: window.xkTel.citycode,//城市编号
      level: window.xkTel.level,
      group_id: window.xkTel.group_id,//部组id
      jobid: window.xkTel.jobid,//销售工号
      start_date: date,
      end_date: date
    }, function (res) {
      dispatch(GET_telstatresult(res.result.data));
    }));
  }
}

export function GET_telstatresult(data) {//渲染数据
  return {
    type: "GET_telstatresult",
    value: data,
  }
}
/**
 * Home页结果日期action End
 */

export function CHANGE_callblock(block) {//改变队列板块选择
  return {
    type: "CHANGE_callblock",
    block: block,
  }
}

export function CHANGE_listNum(data) {//得到各队列人数
  return {
    type: "CHANGE_listNum",
    value: {
      queuenum: data.queuenum, //待呼数
      callnum: data.callnum, // 已呼数
      locknum: data.locknum,   // 锁定数
    }
  }
}

/**
 * 待呼叫
 * */
export function CHANGE_uncallRes(data) {//得到待呼叫队列
  return {
    type: "CHANGE_uncallRes",
    value: data,
  }
}

export function uncallAjax() {//待呼叫队列AJAX
  return function (dispatch, getState) {
    dispatch(postData('/saleajax/tellist/', Object.assign({}, getState().uncallData), function (res) {
      const data = res.result.data;
      dispatch(CHANGE_listNum(data));
      dispatch(CHANGE_uncallRes(res.result.data));
    }))
  }
}

export function CHANGE_uncallData(param) {//改变待呼叫筛选项
  return function (dispatch, getState) {
    param && dispatch({
      type: "ADD_uncallData",
      param: param,
    });
    dispatch(uncallAjax());
  }
}

export function GET_uncallConfig() {
  return function (dispatch, getState) {
    dispatch(postData('/saleajax/gettellistconfig/', {
      citycode: window.xkTel.citycode,//城市编号
      jobid: window.xkTel.jobid,//销售工号
      tel_group_id: window.xkTel.group_id,//部组id
      noLoad: true,
    }, (res) => {
      dispatch({
        type: "GET_uncallConfig",
        value: res.result.data
      })
    }))
  }
}

/**
 * 已呼叫
 * */

export function CHANGE_calledRes(data) {//得到待呼叫队列
  return {
    type: "CHANGE_calledRes",
    value: data,
  }
}

export function calledAjax() {//待呼叫队列AJAX
  return function (dispatch, getState) {
    dispatch(postData('/saleajax/tellist/', Object.assign({}, getState().calledData), function (res) {
      const data = res.result.data;
      dispatch(CHANGE_listNum(data));
      dispatch(CHANGE_calledRes(res.result.data));
    }))
  }
}

export function CHANGE_calledData(param) {//改变待呼叫筛选项
  return function (dispatch, getState) {
    param && dispatch({
      type: "ADD_calledData",
      param: param,
    });
    dispatch(calledAjax());
  }
}

export function GET_calledConfig() {
  return function (dispatch, getState) {
    dispatch(postData('/saleajax/getcallconfig/', {
      citycode: window.xkTel.citycode,//城市编号
      jobid: window.xkTel.jobid,//销售工号
      tel_group_id: window.xkTel.group_id,//部组id
      noLoad: true,
    }, (res) => {
      dispatch({
        type: "GET_calledConfig",
        value: res.result.data
      })
    }))
  }
}




