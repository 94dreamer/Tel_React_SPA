/**
 * Created by zz on 2016/10/28.
 */
import React,{Component} from 'react';
export default class Uncall_btn extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    let isSet = (!window.gArr['saleinfo'] || !window.gArr['saleinfo'].position || window.gArr['saleinfo'].position != 6);
    let level = window.xkTel.level;
    let isCallCenter = window.xkTel.isCallCenter;
    return (
      <div className="hd_btn">
        {level ?
          (isCallCenter ? <span>
            <a href="javascript:void(0);" id="startWork" className="btn_blue">正在登录</a>
            <a href="javascript:void(0);" id="quitWork" className="btn_red">置忙</a>
            </span> :
              <a href="javascript:void(0);" id="startWork" className="btn_blue">:开始工作</a>
          )
          : null
        }

        {isSet ? <a href="javascript:void(0);" id="setTarget" className="btn_blue">设置目标</a> : null}

        {isSet && window.xkTelInfo.telGroupRelationType == 2 ?
          <a href="javascript:void(0);" id="groupAllocat" className="btn_blue">部组分配</a> : null}

        <a href="javascript:void(0);" id="exportUncall" className="btn_gray">导出数据</a>
      </div>
    )
  }
}