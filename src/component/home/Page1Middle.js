/**
 * Created by zz on 2016/8/19.
 */
import React, {Component} from 'react';
import UncallBox from './UncallBox';
import CalledBox from './CalledBox';
import LockInBox from './LockInBox';
import {connect} from 'react-redux';
import actions from '../../actions';

const pointer = {
  cursor: "pointer",
};

class Page1Middle extends Component {
  /*changeBlock = (e) => {
   this.props.dispatch({type: "CHANGE_callblock", block: e.target.dataset.block})
   };*/

  render() {
    const {callblock, listNum, changeBlock} = this.props;
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
            <li className={callblock === "uncall" ? "current" : null} onClick={e => {
              changeBlock("uncall")
            }}>
              <a style={pointer}>待呼叫<span>{listNum.queuenum || 0}</span></a>
            </li>
            <li className={callblock === "called" ? "current" : null} onClick={e => {
              changeBlock("called")
            }}>
              <a style={pointer}>已呼叫<span>{listNum.callnum || 0}</span></a>
            </li>
            <li className={callblock === "lockIn" ? "current" : null} onClick={e => {
              changeBlock("lockIn")
            }}>
              <a style={pointer}>锁定中<span>{listNum.locknum || 0}</span></a>
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
    listNum: state.listNum,
    callblock: state.callblock,
  }
}

function mapDispathToProps(dispatch, ownProps) {
  return {
    changeBlock: (e) => dispatch(actions.CHANGE_callblock(e))
  }
}

export default connect(select, mapDispathToProps)(Page1Middle)
