/**
 * Created by zz on 2016/8/19.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import CalledChoose from './CalledChoose';
import CalledTab from './CalledTab';
import FootPage from './../common/FootPage';

class CalledBox extends Component {
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
  };

  componentDidMount() {
    this.props.changeData();
    this.props.getConfig();
  }

  render() {

    console.log("CalledBox render");
    const {calledData, calledRes, config, changeData} = this.props;
    return (
      <div id="called-tag" className="tag_tab">
        <div className="tag_callCon">
          <div className="hd_btn">
            <a href="javascript:void(0);" id="exportCalled" className="btn_gray">导出数据</a>
          </div>
          <div className="called_choose_box">
            {config && <CalledChoose calledData={calledData} config={config} changeData={changeData}/>}
          </div>
          <div className="h15"></div>
        </div>
        <div className="table_callCon">
          <UncallTab data={calledRes}/>
          <div className="main-foot">
            <FootPage turnPage={this.turnPage}/>
          </div>
        </div>
      </div>
    )
  }
}

function select(state) {
  let {calledData, calledRes, config, changeData} = state;
  return {
    calledData, calledRes, config, changeData
  }
}

export default connect(select)(CalledBox);
