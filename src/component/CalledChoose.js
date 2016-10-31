/**
 * Created by zz on 2016/10/28.
 */
import React,{Component} from 'react';
import {ChoosePosition} from './ChoosePosition';
import {ChooseGroup} from './ChooseGroup';
import {ChooseKeyword} from './ChooseKeyword';

export default class CalledChoose extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <ChoosePosition />
        <ChooseGroup />
        <div className="item">
          <div className="position clearfix" style={{display: "block"}}>
            <h2 className="fl">电销标签：</h2>
            <a href="javascript:void(0);" data-type="visitlabel" className="onend">全部</a>
            <a href="javascript:void(0);" data-type="visitlabel" data-id="1">已邀约</a>
            <a href="javascript:void(0);" data-type="visitlabel" data-id="5">邀约回访</a>
            <a href="javascript:void(0);" data-type="visitlabel" data-id="6">陌拜回访</a>
            <a href="javascript:void(0);" data-type="visitlabel" data-id="7">自我安排回访</a>
            <a href="javascript:void(0);" data-type="visitlabel" data-id="2">未达标提醒</a>
            <a href="javascript:void(0);" data-type="visitlabel" data-id="3">7天开通关怀</a>
            <a href="javascript:void(0);" data-type="visitlabel" data-id="4">7天下线提醒</a>
          </div>
        </div>
        <div className="item">
          <div className="position clearfix" style={{display: "block"}}>
            <h2 className="fl">呼叫状态：</h2>
            <a href="javascript:void(0);" data-type="call_status" className="onend">全部</a>
            <a href="javascript:void(0);" data-type="call_status" data-id="1">呼叫成功</a>
            <a href="javascript:void(0);" data-type="call_status" data-id="2">呼叫失败</a>
          </div>
        </div>
        <div className="item">
          <div className="position clearfix" style={{display: "block"}}>
            <h2 className="fl">客户意向：</h2>
            <a href="javascript:void(0);" data-type="buylevel" className="onend">全部</a>
            <a href="javascript:void(0);" data-type="buylevel" data-id="2">A+有意向</a>
            <a href="javascript:void(0);" data-type="buylevel" data-id="3">A可以考虑</a>
            <a href="javascript:void(0);" data-type="buylevel" data-id="5">B暂无意向</a>
            <a href="javascript:void(0);" data-type="buylevel" data-id="6">C不考虑</a>
            <a href="javascript:void(0);" data-type="buylevel" data-id="0">未填写</a>
          </div>
        </div>
        <div className="item">
          <div className="position clearfix" style={{display: "block"}}>
            <h2 className="fl">呼叫时间：</h2>
            <div className="visit_time date-box clearfix fl">
              <input className="time_l fl" id="callDate" placeholder="选择日期"/>
              <label htmlFor="callDate" className="time_r fl"><em className="icon-date" /></label>
            </div>
          </div>
        </div>
        <ChooseKeyword />
      </div>
    )
  }
}
