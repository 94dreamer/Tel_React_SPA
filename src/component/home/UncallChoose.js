/**
 * Created by zz on 2016/10/28.
 */

import React, {Component} from 'react';
import ChoosePosition from './ChoosePosition';
import ChooseGroup from './ChooseGroup';
import ChooseKeyword from './ChooseKeyword';
import ChooseCity from './ChooseCity'

export default class UncallChoose extends Component {
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
    //this.ajaxRequest.abort();
  }

  render() {
    const {uncallData, config, changeData}=this.props;
    const {citycode}=window.ROLE;
    const callqueue = {
      "1": "首次邀约",
      "2": "临时指派",
      "3": "回访核实",
      "4": "未达标",
      "5": "7天到期",
      "6": "7天开通"
    };
    console.log("UncallChoose render");
    return (
      <div>
        {citycode == 'hq' && <ChooseCity citycode={uncallData.citycode} citys={config.city}/>}
        <ChoosePosition currentDistrict={uncallData.district} currentBlock={uncallData.block} blocks={config.block}/>
        <div className="item">
          <div className="position clearfix">
            <h2 className="fl">呼叫列队：</h2>
            {Object.keys(callqueue).map((i) =>
              <a style={{cursor: "pointer"}} className={i == uncallData.callqueue ? "oned" : null}
                 onClick={changeData} key={i} data-type="callqueue" data-id={i}>{callqueue[i]}</a>
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
