/**
 * Created by zz on 2016/10/28.
 */

import React, {Component, PropTypes} from 'react';
import DatePicker from 'react-datepicker';
import ChoosePosition from './ChoosePosition';
import ChooseGroup from './ChooseGroup';
import ChooseKeyword from './ChooseKeyword';
import ChooseCity from './ChooseCity';
import moment from 'moment';

export default class UncallChoose extends Component {
  static propTypes = {
    uncallData: PropTypes.object.isRequired,
    config: PropTypes.object,
    changeData: PropTypes.func.isRequired,
  };

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
    const {uncallData, config, changeData} = this.props;
    const {citycode} = window.ROLE;
    const callqueue = {
      "1": "首次邀约",
      "2": "临时指派",
      "3": "回访核实",
      "4": "未达标",
      "5": "7天到期",
      "6": "7天开通"
    };
    let date = uncallData.queuedate ? moment(uncallData.queuedate) : moment(new Date());
    console.log("UncallChoose render");
    return (
      <div>
        {citycode == 'hq' && config && <ChooseCity citycode={uncallData.citycode} citys={config.city}/>}
        {config &&
        <ChoosePosition currentDistrict={uncallData.district} currentBlock={uncallData.block} blocks={config.block}/>}
        <div className="item">
          <div className="position clearfix">
            <h2 className="fl">呼叫列队：</h2>
            {Object.keys(callqueue).map((i) =>
              <a style={{cursor: "pointer"}} className={i == uncallData.callqueue ? "oned" : null}
                 onClick={changeData} key={i} data-type="callqueue" data-id={i}>{callqueue[i]}</a>
            )}
            <h2 className="fl dataCon">队列日期：</h2>
            <div className="visit_time date-box clearfix fl">
              <DatePicker id="queueDate" className="time_l fl"
                          dateFormat="YYYY/MM/DD"
                          selected={date}
                          dateFormatCalendar="MMMM"
                          locale="zh-cn"
                          onChange={(e) => {
                            changeDate(e.format('YYYY/MM/DD'))
                          }}
              />
              <label htmlFor="queueDate" className="time_r fl"><em className="icon-date"/></label>
            </div>
          </div>
        </div>
        {config && <ChooseGroup groups={config.group} currentParent={uncallData.parent} currentGroup={uncallData.group}/>}
        <ChooseKeyword />
      </div>
    )
  }
}
