/**
 * Created by zz on 2016/10/28.
 */
import React, {Component, PropTypes} from 'react';
import ChoosePosition from './ChoosePosition';
import ChooseGroup from './ChooseGroup';
import ChooseCallstatus from './ChooseCallstatus'
import ChooseKeyword from './ChooseKeyword';
import ChooseCity from "./ChooseCity";

export default class CalledChoose extends Component {
  static propTypes = {
    calledData: PropTypes.object.isRequired,
    config: PropTypes.object,
    changeData: PropTypes.func.isRequired,
  };

  render() {
    const {calledData, config, changeData} = this.props;
    const {citycode} = window.ROLE;
    let date = calledData.callDate ? moment(calledData.callDate) : moment(new Date());
    return (
      <div>
        {citycode == 'hq' && config && <ChooseCity citycode={uncallData.citycode} citys={config.city}/>}
        <ChoosePosition currentDistrict={calledData.district} currentBlock={calledData.block} blocks={config.block}/>
        <ChooseGroup groups={config.group} currentParent={calledData.parent} currentGroup={calledData.group}/>
        <div className="item">
          <div className="position clearfix">
            <h2 className="fl">电销标签：</h2>
            <a href="javascript:;" data-type="visitlabel" className="onend">全部</a>
            <a href="javascript:;" data-type="visitlabel" data-id="1">已邀约</a>
            <a href="javascript:;" data-type="visitlabel" data-id="5">邀约回访</a>
            <a href="javascript:;" data-type="visitlabel" data-id="6">陌拜回访</a>
            <a href="javascript:;" data-type="visitlabel" data-id="7">自我安排回访</a>
            <a href="javascript:;" data-type="visitlabel" data-id="2">未达标提醒</a>
            <a href="javascript:;" data-type="visitlabel" data-id="3">7天开通关怀</a>
            <a href="javascript:;" data-type="visitlabel" data-id="4">7天下线提醒</a>
          </div>
        </div>
        <ChooseCallstatus currentCall_status={calledData.call_status} currentCall_item={calledData.call_item}/>
        <div className="item">
          <div className="position clearfix multi" style="display: block;">
            <h2 className="fl">预约情况：</h2>
            <a href="javascript:;" data-type="customerintention" className="onend">全部</a>
            <a href="javascript:;" data-type="customerintention" data-id="6">可见面</a>
            <a href="javascript:;" data-type="customerintention" data-id="3">无面见意向</a>
            <a href="javascript:;" data-type="customerintention" data-id="4">离职</a>
            <a href="javascript:;" data-type="customerintention" data-id="5">改行</a>
          </div>
        </div>
        <div className="item">
          <div className="position clearfix multi" style="display: block;">
            <h2 className="fl">核实意向：</h2>
            <a href="javascript:;" data-type="buylevel" className="onend">全部</a>
            <a href="javascript:;" data-type="buylevel" data-id="2">A+有意向</a>
            <a href="javascript:;" data-type="buylevel" data-id="3">A可以考虑</a>
            <a href="javascript:;" data-type="buylevel" data-id="5">B暂无意向</a>
            <a href="javascript:;" data-type="buylevel" data-id="6">C不考虑</a>
            <a href="javascript:;" data-type="buylevel" data-id="-1">未填写</a>
          </div>
        </div>
        <div className="item">
          <div className="position clearfix">
            <h2 className="fl">呼叫时间：</h2>
            <div className="visit_time date-box clearfix fl">
              <DatePicker id="callDate" className="time_l fl"
                          dateFormat="YYYY/MM/DD"
                          selected={date}
                          dateFormatCalendar="MMMM"
                          locale="zh-cn"
                          onChange={(e) => {
                            changeDate(e.format('YYYY/MM/DD'))
                          }}
              />
              <label htmlFor="callDate" className="time_r fl"><em className="icon-date"/></label>
            </div>
          </div>
        </div>
        <ChooseKeyword />
        <div className="cleanbox">
          <a></a>
        </div>
      </div>
    )
  }
}
