/**
 * Created by zz on 2016/8/19.
 */
import React,{Component} from 'react';
import UncallBox from './UncallBox';
import CalledBox from './CalledBox';
import {connect} from 'react-redux';

class Page1Middle extends Component {
  constructor(props) {
    super(props);
    this.changeBlock=this.changeBlock.bind(this);
  }

  changeBlock(e){
    this.props.dispatch({type:"CHANGE_callblock",block:e.target.dataset.block})
  }

  render() {
    const { dispatch, callblock , queuenum , callnum } = this.props;
    console.log("Page1Middle", this.props);
    return (
      <div id="page1_middle">
        <div className="Telemarketing_main">
          <ul className="main-title">
            <li className={callblock === "uncall" ?"current":null} data-type="uncall">
              <a style={{cursor:"pointer"}} onClick={this.changeBlock} data-block="uncall">待呼叫<span>{queuenum || 0}</span></a>
            </li>
            <li className={callblock === "called" ?"current":null} data-type="called">
              <a style={{cursor:"pointer"}} onClick={this.changeBlock} data-block="called">已呼叫<span>{callnum || 0}</span></a>
            </li>
          </ul>
          <div className="tagBox">
            {callblock === "uncall" ?
              <UncallBox />
              :
              <CalledBox />
            }
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
    callblock: state.callblock
  }
}
export default connect(select)(Page1Middle)
