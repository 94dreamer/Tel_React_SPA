/**
 * Created by zz on 2016/10/28.
 */

import React, {Component} from 'react';
import ChoosePosition from './ChoosePosition';
import ChooseGroup from './ChooseGroup';
import ChooseKeyword from './ChooseKeyword';
import ChooseCity from './ChooseCity'

export default class UncallChoose extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    /*this.ajaxRequest = $.ajax({
      url: '/saleajax/gettellistconfig/',
      data: {
        citycode: window.xkTel.citycode,//城市编号
        jobid: window.xkTel.jobid,//销售工号
        tel_group_id: window.xkTel.group_id//部组id
      },
      success: function (res) {
        var res = (typeof res == 'string') ? JSON.parse(res) : res;
        if (res.result.code == 0) {
          this.setState(res.result.data)
        } else {
          alert(res.result.message);
        }
      }.bind(this)
    });*/
  }

  componentWillUnmount() {//组件移除前停止异步操作。
    this.ajaxRequest.abort();
  }

  render() {
    const {uncallData, tellistconfig, changeData}=this.props;
    const {citycode}=window.ROLE;
    const callqueue = {
      "1": "首次邀约",
      "2": "临时指派",
      "3": "回访核实",
      "4": "未达标",
      "5": "7天到期",
      "6": "7天开通"
    };
    const callArr = [];
    for (const i in callqueue) {
      if ({}.hasOwnProperty.call(callqueue, i)) {
        // callArr.push(<a href="javascript:void(0);" className={window.telSales.uncallData.callqueue==i?"onend":null} key={i} data-type="callqueue" data-id={i}>{callqueue[i]}</a>)
        callArr.push({key: i, value: callqueue[i]})
      }
    }
    console.log("UncallChoose render");
    return (
      <div>
        {citycode == 'hq' && <ChooseCity citycode={uncallData.citycode} citys={tellistconfig.city}/>}
        <ChoosePosition block={this.state.block}/>
        <div className="item">
          <div className="position clearfix">
            <h2 className="fl">呼叫列队：</h2>
            {callArr.map(item =>
              <a style={{cursor: "pointer"}} className={item.key == uncallData.callqueue ? "oned" : null}
                 onClick={changeData} key={item.key} data-type="callqueue" data-id={item.key}>{item.value}</a>
            )}
            <h2 className="fl dataCon">队列日期：</h2>
            <div className="visit_time date-box clearfix fl">
              <input className="time_l fl" id="queueDate" placeholder="选择日期"/>
              <label htmlFor="queueDate" className="time_r fl"><em className="icon-date"/></label>
            </div>
          </div>
        </div>
        <ChooseGroup group={this.state.group}/>
        <ChooseKeyword />
      </div>
    )
  }
}
