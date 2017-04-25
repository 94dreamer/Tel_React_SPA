/**
 * Created by zz on 2016/10/28.
 */
import React, {Component} from 'react';
export default class Uncall_btn extends Component {
  render() {
    let {isSet, level, isCallCenter, telGroupRelationType} =window.ROLE;
    return (
      <div className="hd_btn">
        {level ?
          (isCallCenter ? <span>
            <a href="javascript:;" id="startWork" className="btn_blue">正在登录</a>
            <a href="javascript:;" id="quitWork" className="btn_red">置忙</a>
            </span> :
              <a href="javascript:;" id="startWork" className="btn_blue">开始工作</a>
          )
          : null
        }

        {isSet ? <a href="javascript:;" id="setTarget" className="btn_blue">设置目标</a> : null}

        {isSet && telGroupRelationType == 2 ?
          <a href="javascript:;" id="groupAllocat" className="btn_blue">部组分配</a> : null}

        <a href="javascript:;" id="exportUncall" className="btn_gray">导出数据</a>
      </div>
    )
  }
}