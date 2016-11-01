/**
 * Created by zz on 2016/10/28.
 */
import React,{Component} from 'react';
import {ChoosePosition} from './ChoosePosition';
import {ChooseGroup} from './ChooseGroup';
import {ChooseKeyword} from './ChooseKeyword';

export default class UncallChoose extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const callqueue = {
      "1": "首次邀约",
      "2": "临时指派",
      "3": "回访核实",
      "4": "未达标",
      "5": "7天到期",
      "6": "7天开通"
    };
    var callArr = [];
    for (let i in  callArr) {
      callArr.push(
        <a href="javascript:void(0);" className={window.telSales.uncallData.callqueue==i?onend:null} data-type="callqueue" data-id={i}>{callqueue[i]}</a>)
    }
    return (
      <div>
        <ChoosePosition />
        <div className="item">
          <div className="position clearfix" style="display: block;">
            <h2 className="fl">呼叫列队：</h2>
            {callArr}
            <h2 className="fl dataCon">队列日期：</h2>
            <div className="visit_time date-box clearfix fl">
              <input className="time_l fl" id="queueDate" placeholder="选择日期"/>
              <label for="queueDate" className="time_r fl"><em className="icon-date"></em></label>
            </div>
          </div>
        </div>
        <ChooseGroup />
        <ChooseKeyword />
      </div>
    )
  }
}