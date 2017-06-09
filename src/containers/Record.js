import React, {Component} from 'react';
import User from '../component/record/User';
import History from '../component/record/History';
import {connect} from 'react-redux';
import actions from '../actions';

const Record = (props) => {
  //解析参数
  let {search} = props.location || window.location;
  search = search.slice(1).split('&');
  var params = {};
  search.map(item => {
    let param = item.split('=');
    params[param[0]] = param[1];
  });
  return (
    <section className="r-c g-lastu">
      <header className="log-tel-hd clearfix">
        <h3><em className="ico-n" />已呼出明细</h3>
      </header>
      <User params={params} agentInfoAjax={props.agentInfoAjax} telagentinfo={props.telagentinfo}/>
      <History params={params} visitListAjax={props.visitListAjax} visitlist={props.visitlist}/>
    </section>
  )
};

const mapStateToProps = (state,ownProps) => {
  return {
    telagentinfo: state.telagentinfo,
    visitlist: state.visitlist,
    location:ownProps.location
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    agentInfoAjax: (e) => dispatch(actions.agentInfoAjax(e)),
    visitListAjax: (e) => dispatch(actions.visitListAjax(e)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Record);
