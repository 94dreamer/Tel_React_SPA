/**
 * Created by zz on 2016/8/19.
 */
import React, {Component} from 'react';
import UncallBox from './UncallBox';
import CalledBox from './CalledBox';
import LockInBox from './LockInBox';
import {connect} from 'react-redux';

const pointer = {
  cursor: "pointer",
};

class Page1Middle extends Component {
  changeBlock = (e) => {
    this.props.dispatch({type: "CHANGE_callblock", block: e.target.dataset.block})
  };

  render() {
    const {callblock, queuenum, callnum} = this.props;
    console.log("Page1Middle", this.props);
    let Content = null;
    switch (callblock) {
      case "uncall":
        Content = <UncallBox />;
        break;
      case "called":
        Content = <CalledBox />;
        break;
      case "lockIn":
        Content = <LockInBox />;
        break;
      default:
        Content = null;
    }
    return (
      <div id="page1_middle">
        <div className="Telemarketing_main">
          <ul className="main-title">
            <li className={callblock === "uncall" ? "current" : null}>
              <a data-block="uncall" style={pointer} onClick={this.changeBlock}>待呼叫<span>{queuenum || 0}</span></a>
            </li>
            <li className={callblock === "called" ? "current" : null}>
              <a data-block="called" style={pointer} onClick={this.changeBlock}>已呼叫<span>{callnum || 0}</span></a>
            </li>
            <li className={callblock === "lockIn" ? "current" : null}>
              <a data-block="lockIn" style={pointer} onClick={this.changeBlock}>锁定中<span>0</span></a>
            </li>
          </ul>
          <div className="tagBox">
            {Content}
          </div>
        </div>
      </div>
    )
  }
}

function select(state) {
  return {
    queuenum: state.queuenum,
    callnum: state.callnum,
    callblock: state.callblock,
  }
}
export default connect(select)(Page1Middle)
