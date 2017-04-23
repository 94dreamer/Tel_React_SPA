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
    dispatch(telstatresultAjax());
  }
}

export function telstatresultAjax(date) {//发起ajax
  return function (dispatch, getState) {
    dispatch(ADD_loadNum());
    $.ajax({
      url: '/saleajax/telstatresult/',
      data: {
        citycode: window.xkTel.citycode,//城市编号
        level: window.xkTel.level,
        group_id: window.xkTel.group_id,//部组id
        jobid: window.xkTel.jobid,//销售工号
        start_date: date,
        end_date: date
      },
      success: function (res) {
        var res = (typeof res == 'string') ? JSON.parse(res) : res;
        if (res.result.code == 0) {
          dispatch(GET_telstatresult(res.result.data));
        } else {
          alert(res.result.message);
        }
        dispatch(DEL_loadNum());
      }
    })
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

export function CHANGE_callblock(block) {
  return {
    type: "CHANGE_callblock",
    block: block,
  }
}



