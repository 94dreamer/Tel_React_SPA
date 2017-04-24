/**
 * Created by zz on 2016/8/19.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Uncall_btn from './Uncall_btn'
import UncallChoose from './UncallChoose';
import UncallTab from './UncallTab';
import FootPage from './../common/FootPage';
import actions from '../../constants';

class UncallBox extends Component {
  turnPage = (index) => {
    this.props.changeData({
      type: "currpage",
      value: index,
    });
  };

  callout = (tel, uid) => {

  };

  changeData = (e) => {
    const dataType = e.target.dataset.type;
    const dataId = e.target.dataset.id;
    if (!dataType) {
      return
    }
    this.props.changeData({
      type: dataType,
      value: dataId
    });
  }

  componentDidMount() {
    this.props.uncallAjax()
  }

  componentWillUnmount() {//组件移除前停止异步操作。
    //this.ajaxRequest.abort();
  }

  render() {
    console.log("UncallBox render");
    const {uncallData, uncallRes, uncallAjax} =this.props;
    return (
      <div id="uncall-tag" className="tag_tab">
        <div className="tag_callCon">
          <Uncall_btn />
          <UncallChoose uncallData={uncallData} changeData={this.turnPage}/>
          <div className="h15"></div>
        </div>
        <div className="table_callCon">
          <UncallTab {...uncallRes} />
          <div className="main-foot">
            <FootPage turnPage={uncallAjax}/>
          </div>
        </div>
      </div>
    )
  }
}

function select(state) {
  return {
    uncallData: state.uncallData,
    uncallRes: state.uncallRes,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    uncallAjax: (e) => dispatch(actions.uncallAjax(e)),
    changeData: (e) => dispatch(actions.CHANGE_uncallData(e)),
  }
}
export default connect(select, mapDispatchToProps)(UncallBox);
