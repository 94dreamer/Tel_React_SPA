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
    const callArr = [];
    for (const i in callqueue) {
      if ({}.hasOwnProperty.call(callqueue, i)) {
        // callArr.push(<a href="javascript:void(0);" className={window.telSales.uncallData.callqueue==i?"onend":null} key={i} data-type="callqueue" data-id={i}>{callqueue[i]}</a>)
        callArr.push({key: i, value: callqueue[i]})
      }
    }

    return (
      <div>
        aaa
      </div>
    )
  }
}
