/**
 * Created by zz on 2016/10/28.
 */

import React, {Component, PropTypes} from 'react';

export default class ChooseCallstatus extends Component {
  render() {
    const {currentCall_status, currentCall_item} = this.props;
    const status = [{
      id: "1",
      name: "呼叫成功",
      call_item: [
        {"id": "1", "name": "有效呼叫"},
        {"id": "2", "name": "呼叫成功但未沟通"},
        {"id": "8", "name": "电话错误"}
      ],
    }, {
      id: "2",
      name: "呼叫失败",
      call_item: [
        {"id": "3", "name": "空号"},
        {"id": "4", "name": "拒接"},
        {"id": "5", "name": "停机"},
        {"id": "6", "name": "关机"},
        {"id": "7", "name": "占线"}
      ]
    }];
    var call_item;
    let parentArr = status.map((item) => {
      var classname = '';
      if (item.id == currentCall_status) {
        classname = 'onend';
        call_item = item.call_item;
      }
      return (<a href="javascript:;" data-type="call_status" className={classname} data-id={item.id}
                 key={item.id}>{item.name}<i/></a>)
    });

    return (
      <div className="item">
        <div className="position clearfix">
          <h2 className="fl">呼叫状态：</h2>
          <a href="javascript:;" data-type="call_status" className={!currentCall_status ? "onend" : null}>全部</a>
          {parentArr}
        </div>
        {currentGroup &&
        <div className="line-list">
          <ChooseGroupHover call_item={call_item} currentGroup={currentCall_item}/>
        </div>
        }
      </div>
    )
  }
}

class ChooseGroupHover extends Component {
  render() {
    const {call_item, currentGroup} = this.props;
    return (
      <div class="choose multi">
        <a href="javascript:;" data-type="call_item" class={currentGroup ? null : "onend"}>全部</a>
        {call_item.map((item) =>
          <a href="javascript:void(0);" data-type="call_item" data-id={item.id} key={item.id} className={item.id==currentGroup?"onend":null}>{item.name}</a>
        )}
      </div>
    )
  }
}
