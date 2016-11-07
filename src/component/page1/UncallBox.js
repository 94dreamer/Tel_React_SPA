/**
 * Created by zz on 2016/8/19.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import Uncall_btn from './Uncall_btn'
import UncallChoose from './UncallChoose';
import UncallTab from './UncallTab';
import FootPage from './../common/FootPage';

class UncallBox extends Component {
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
      url: '/saleajax/tellist/',
      data: {...this.props.uncallData, currpage: page},
      success: function (res) {
        var res = (typeof res == 'string') ? JSON.parse(res) : res;
        if (res.result.code == 0) {
          this.setState(res.result)
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
    console.log("UncallBox render");
    const {dispatch} =this.props;
    return (
      <div id="uncall-tag" className="tag_tab">
        <div className="tag_callCon">
          <Uncall_btn />
          <UncallChoose uncallData={this.props.uncallData} />
          <div className="h15"></div>
        </div>
        <div className="table_callCon">
          <UncallTab {...this.state} />
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
    uncallData: state.uncallData
  }
}
export default connect(select)(UncallBox);
