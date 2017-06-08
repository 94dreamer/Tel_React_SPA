/**
 * Created by zz on 2016/8/19.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Uncall_btn from './Uncall_btn'
import UncallChoose from './UncallChoose';
import UncallTab from './UncallTab';
import FootPage from './../common/FootPage';
import actions from '../../actions';

class UncallBox extends Component {
  turnPage = (index) => {
    this.props.changeData({
      type: "currpage",
      value: index,
    });
  };

  callout = (tel, uid) => {

  };

  changeData = (e,params) => {
    let action=null;
    if(e){
      const dataType = e.target.dataset.type;
      const dataId = e.target.dataset.id;
      if (!dataType) {
        return
      }
      action={
        type: dataType,
        value: dataId
      }
    }else {
      action=params;
    }
    console.log(action);
    this.props.changeData(action);
  };

  componentDidMount() {
    this.props.changeData();
    this.props.getConfig();
  }

  render() {
    console.log("UncallBox render");
    const {uncallData, uncallRes, config} = this.props;
    return (
      <div id="uncall-tag" className="tag_tab">
        <div className="tag_callCon">
          <Uncall_btn />
          <div className="uncall_choose_box">
            {config && <UncallChoose uncallData={uncallData} config={config} changeData={this.changeData}/>}
          </div>
          <div className="h15"></div>
        </div>
        <div className="table_callCon">
          <UncallTab data={uncallRes}/>
          <div className="main-foot">
            <FootPage turnPage={this.turnPage}/>
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
    config: state.uncallConfig,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeData: (e) => dispatch(actions.CHANGE_uncallData(e)),
    getConfig: () => dispatch(actions.GET_uncallConfig())
  }
}
export default connect(select, mapDispatchToProps)(UncallBox);
