/**
 * Created by zz on 2016/8/19.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import CalledChoose from './CalledChoose';
import CalledTab from './CalledTab';
import FootPage from './../common/FootPage';

class CalledBox extends Component {
  constructor(props) {
    super(props);
    this.turnPage = this.turnPage.bind(this);
    this.callout = this.callout.bind(this);
    this.ajaxTable = this.ajaxTable.bind(this);
  }

  turnPage(index) {
    this.ajaxTable(index);
  }

  callout(tel, uid) {

  }

  ajaxTable(page) {
    this.ajaxRequest && this.ajaxRequest.abort();
    this.ajaxRequest = $.ajax({
      url: '/saleajax/getcalllist/',
      data: {...this.props.calledData, currpage: page},
      success: function (res) {
        var res = (typeof res == 'string') ? JSON.parse(res) : res;
        if (res.result.code == 0) {
          this.setState(res.result);
        } else {
          alert(res.result.message);
        }
      }.bind(this)
    })
  }

  componentDidMount() {
    this.ajaxTable()
  }

  componentWillUnmount() {//组件移除前停止异步操作。
    this.ajaxRequest.abort();
  }

  render() {
    return (
      <div id="called-tag" className="tag_tab dn">
        <div className="tag_callCon">
          <div className="hd_btn">
            <a href="javascript:void(0);" id="exportCalled" className="btn_gray">导出数据</a>
          </div>
          <CalledChoose />
          <div className="h15"></div>
        </div>
        <div className="table_callCon">
          <div className="log-table log-table-sales">
            <CalledTab {...this.state} />
          </div>
          <div className="main-foot">
            <FootPage />
          </div>
        </div>
      </div>
    )
  }
}

function select(state) {
  return {
    calledData: state.calledData
  }
}

export default connect(select)(CalledBox);
