/**
 * Created by zhouzhen on 2017/4/29.
 */
import React, {Component, PropTypes} from 'react';

export  default  class LockInTab extends Component {
  render() {
    const {data} = this.props;
    const {isSet, citycode} = window.ROLE;
    if (!data.list.length) {
      return <div classNames="side-null"></div>
    }
    return (
      <table cellPadding="0" cellSpacing="0" width="100%">
        <tr>
          <th width="10%">序号</th>
          <th width="12%">客户姓名</th>
          <th width="17%">所属门店</th>
          <th width="12%">销售名称</th>
          <th width="15%">所属部组</th>
          <th width="12%">锁定时间</th>
          <th width="12%">电销姓名</th>
          {isSet && <th width="10%">操作</th>}
        </tr>
        {data.list.map((list) => <Tr list={list}/>)}
      </table>
    )
  }
}

class Tr extends Component {
  render() {
    const {list} = this.props;
    const {isSet, citycode} = window.ROLE;
    return (
      <tr>
        <td>{list.number}</td>
        {window.ROLE['jobid'] &&
        <td><a target='_blank'
               href="/saletel/record/?citycode=<%=window.xkTel.citycode%>&uid=<%=list.basicinfo.uid%>&dpid=<%=window.$_GET['dpid']%>&groupid=<%=window.$_GET['groupid']%>&jobid=<%=window.$_GET['jobid']%>&currcity=<%=list.citycode%>">{list.basicinfo.name}</a>
        </td>}
        {window.ROLE['groupid'] &&
        <td><a target='_blank'
               href="/saletel/record/?citycode=<%=window.xkTel.citycode%>&uid=<%=list.basicinfo.uid%>&dpid=<%=window.$_GET['dpid']%>&groupid=<%=window.$_GET['groupid']%>&currcity=<%=list.citycode%>">{list.basicinfo.name}</a>
        </td>}
        {!window.ROLE['groupid'] && !window.ROLE['jobid'] &&
        <td><a target='_blank'
               href="/saletel/record/?citycode={window.xkTel.citycode}&uid=<%=list.basicinfo.uid%>&groupid=<%=window.$_GET['dpid']%>&currcity=<%=list.citycode%>">{list.basicinfo.name}</a>
        </td>
        }
        <td>{list.basicinfo.companyshortname} {list.basicinfo.storename}</td>
        <td>{list.saleinfo.name || ''}</td>
        <td>{('hq' == citycode) && (list.cityname + "-")}{list.saleinfo.parent_name || ''}-{list.saleinfo.group_name || ''}</td>
        <td>{list.calltelsaleinfo.call_time_view}</td>
        <td>{list.calltelsaleinfo && (list.calltelsaleinfo.group_name || '')}-{list.calltelsaleinfo.name || ''}</td>
        {isSet &&
        <td classNames="bor_r0">
          <a classNames="callBtn" data-uid="<%=list.basicinfo.uid%>" data-citycode="<%=list.citycode%>">解锁</a>
        </td>}
      </tr>
    )
  }
}