/**
 * Created by zz on 2016/8/19.
 */
import React,{Component} from 'react';
import Uncall_btn from './Uncall_btn'
import UncallChoose from './UncallChoose';
import CalledChoose from './CalledChoose';
import UncallTab from './UncallTab';
import CalledTab from './CalledTab';
import FootPage from './FootPage';

import {connect} from 'react-redux';

class Page1Middle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uncall: {data: {}},
      called: {data: {}}
    }
    this.turnPage = this.turnPage.bind(this);
    this.callout = this.callout.bind(this);
    this.ajaxTable = this.ajaxTable.bind(this);
  }

  turnPage(index) {
    this.ajaxTable(index);
  }

  callout(tel, uid) {

  }

  ajaxTable(kind, page) {
    this.ajaxRequest = $.ajax({
      url: kind === 'uncall' ? '/saleajax/tellist/' : '/saleajax/getcalllist/',
      data: kind === 'uncall' ? this.props.uncallData : this.props.calledData,
      success: function (res) {
        var res = (typeof res == 'string') ? JSON.parse(res) : res;
        if (res.result.code == 0) {
          this.setState({
            [kind]: res.result
          })
        } else {
          alert(res.result.message);
        }
      }.bind(this)
    })
  }

  componentDidMount() {
    this.ajaxTable("uncall")
  }

  componentWillUnmount() {//组件移除前停止异步操作。
    this.ajaxRequest.abort();
  }

  render() {
    // 通过调用 connect() 注入:
    const { dispatch, uncallData, calledData} = this.props;
    return (
      <div id="page1_middle">
        <div className="Telemarketing_main">
          <ul className="main-title">
            <li className="current" data-type="uncall">
              <a href="javascript:void(0);">待呼叫（<span>{this.state.uncall.data.queuenum || this.state.called.data.queuenum || 0}</span>）</a>
            </li>
            <li data-type="called" data-time="0">
              <a href="javascript:void(0);">已呼叫（<span>{this.state.called.data.callnum || this.state.uncall.data.callnum || 0}</span>）</a>
            </li>
          </ul>
          <div className="tagBox">
            <div id="uncall-tag" className="tag_tab">
              <div className="tag_callCon">
                <Uncall_btn />
                <UncallChoose />
                <div className="h15"></div>
              </div>
              <div className="table_callCon">
                <div className="log-table log-table-sales">
                  <UncallTab {...this.state.uncall} />
                </div>
                <div className="main-foot">
                  <FootPage />
                </div>
              </div>
            </div>
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
                  <CalledTab {...this.state.called} />
                </div>
                <div className="main-foot">
                  <FootPage />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function select(state) {
  return {
    uncallData: state.uncallData,
    calledData: state.calledData
  }
}
export default connect(select)(Page1Middle)
