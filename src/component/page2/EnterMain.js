/**
 * Created by zz on 2016/11/3.
 */
import React,{ Component } from 'react';
import {connect} from 'react-redux';

class EnterMain extends Component {
  constructor(props) {
    super(props);
    this.state={}
  }

  render(){
    return (
      <section id="tel_work" className="dn" data-uid="<%=info.basicinfo.uid%>">
        /*<%:=baidu.template("work_agent_temp",info)%>*/
    <div className="record_newCon">
      /*<%:=baidu.template("mian_top_temp",window.TEL_AGENT)%>*/
      <div className="record_3">
        <!--预约情况-->
        <div className="yx">
          <h2><em></em>预约情况<span>(选择“可面见”后，该经纪人自动流转给销售跟进）</span></h2>
          <figure className="radio-w">
            <!--baidu.template("tel_buylevel",{})-->
          </figure>
          <div className="tel_nointentionreason dn">无面见意向的原因 <input type="text" id="tel_nointentionreason" maxlength="20" placeholder="无面见意向的原因"/></div>
  <div className="times clearfix">
      <div className="tit dn">建议销售到店时间</div>
      <div className="tit dn">
      预约下次呼叫时间
      </div>
      <div className="dn date-box clearfix">
      <span id="datePicker" className="time_l fl"></span>
      <span className="time_r fl"><em className="icon-date"></em></span>
      </div>
      </div>
      <div className="notconn_item dn">
      <span><i data-val="1" className="btn-radio-no"></i>空号</span>
      <span><i data-val="2" className="btn-radio-no"></i>拒接</span>
      <span><i data-val="3" className="btn-radio-no"></i>停机</span>
      </div>
      </div>
      <!--回访详情-->
      <%if( (window.WORK_PARAM.work_type==2 && window.TEL_AGENT.visitinfo.pid>0) || (window.WORK_PARAM.work_type==1 && window.TEL_AGENT.queueinfo.is_telsalevisit>0)){%>
    <div className="visitCon">
        <h2><em></em>回访详情</h2>
        <!--遍历多个basic_show_temp-->
        </div>
        <%}%>
  <!--竞对情况-->
    <div className="jdui">
      <h2><em></em>竞对情况</h2>
      <!--baidu.template("tel_rival",res.result.data);-->
    </div>
    <!--核实意向-->
    <div className="checkCon">
      <h2><em></em>核实意向</h2>
      <figure className="radio-w">
      <em>意向程度</em>
      <!---->
      </figure>
      </div>
      <div className="desc clearfix">
      <textarea cols="30" rows="10" id="remark" placeholder="详细描述"></textarea>
      <span id="msg-sms"><i className="btn-check-no"></i>短信通知相关销售</span>
      </div>
      <!--btn-->
      <div className="btn-item clearfix">
      <%if(window.xkTelInfo.isCallCenter){%>
    <%if(window.WORK_PARAM.calltype==1){%>
      <div id="next" data-type="finish" className="error-btn"><a>保存</a></div>
          <%}else{%>
      <div data-type="finish" className="error-btn"><a>完成呼叫</a></div>
          <%if(window.WORK_PARAM.work_type==1){%>
        <div id="next" data-type="nextone" className="error-btn"><a>完成并呼叫下一个</a></div>
            <%}%>
      <%}%>
    <%}else{%>
    <div data-type="finish" className="success-btn"><a>完成呼叫</a></div>
        <%if(window.WORK_PARAM.work_type==1){%>
      <div data-type="nextone" className="success-btn"><a>完成并呼叫下一个</a></div>
          <%}%>
    <div data-type="cancel" className="error-btn"><a>取消</a></div>
        <%}%>
  </div>
    </div>
    <!--拜访历史-->
    <div className="record_4">
      <h2><em></em>拜访历史</h2>
      <div className="con">
      <ul className="main-title">
      <li className="current"><a href="javascript:;"> 电销呼叫历史（<span></span>）</a></li>
    </ul>
    <div className="log-table log-table-tel detail-table">
      <table id="visit-table" cellpadding="0" cellspacing="0" width="100%">
      <!--tel_visited_record,data-->
    </table>
    <div className="main-foot">
      <!--("tel_page_foot",data)-->
      </div>
      </div>
      </div>
      </div>
      </div>
      </section>
    )
  }

}

function select(state) {
  return {
    telAgent: state.telAgent
  }
}
export default connect(select)(EnterMain);
