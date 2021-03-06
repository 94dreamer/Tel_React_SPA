/**
 * Created by zz on 2016/10/28.
 */
import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

export default class UncallTab extends Component {
  render() {
    const data = this.props.data || [];
    const isNull = !(data && data.list && data.list.length);
    return (
      isNull ? <div className="log-table log-table-sales">
        <div className="side-null"/>
      </div> :
        <div className="log-table log-table-sales">
          <table cellPadding="0" cellSpacing="0" width="100%">
            <tbody>
            <tr>
              <th width="5%">序号</th>
              <th width="6%">客户姓名</th>
              <th width="8%">所属门店</th>
              <th width="8%">责任销售</th>
              <th width="10%">所属部组</th>
              <th width="8%">上次呼叫时间</th>
              <th width="25%">上次沟通详情</th>
              <th width="20%">待呼叫标识</th>
              <th width="10" className="bor_r0">加入列队的时间</th>
            </tr>
            {data.list.map(list =>
              <tr key={list.uid}>
                <td>{list.number}</td>
                {window.ROLE.level == 1 ?
                  <td>
                    <Link
                      to={{
                        pathname: `/saletel/list/record/`,
                        // pathname: `/saletel/list/record/${window.xkTel.citycode}/${list.basicinfo.uid}/${window.ROLE['jobid']}`,
                        search: `?citycode=${window.xkTel.citycode}&uid=${list.basicinfo.uid}&jobid=${window.ROLE['jobid']}`,
                        state: {
                          // citycode: window.xkTel.citycode,
                          // uid: list.basicinfo.uid,
                          // jobid: window.ROLE['jobid'],
                        }
                      }}>{list.basicinfo.name}</Link>
                  </td> :
                  <td>
                    <Link
                      to={{
                        pathname: '/saletel/list/record/',
                        search: `?citycode=${window.xkTel.citycode}&uid=${list.basicinfo.uid}&groupid=${window.ROLE['groupid']}`,
                        state: {
                          // citycode: window.xkTel.citycode,
                          // uid: list.basicinfo.uid,
                          // groupid: window.ROLE['groupid']
                        },
                        query:{
                          page:1
                        }
                      }}>{list.basicinfo.name}</Link>
                  </td>
                }
                <td>{list.basicinfo.companyshortname} {list.basicinfo.storename}</td>
                <td>{list.saleinfo.name}</td>
                <td>{list.saleinfo.parent_name}-{list.saleinfo.group_name}</td>
                <td>{list.visitinfo.ctime_view}</td>
                <td title={list.visitinfo.remark} style={{cursor: "help"}}>{list.visitinfo.remark}</td>
                <td>
                  <div className="tag_s clearfix">
                    {list.queueinfo.is_firstcall > 0 ? <span className="c_blue">首次</span> : null}
                    {list.queueinfo.is_tempassign > 0 ? <span className="c_purple">指派</span> : null}
                    {list.queueinfo.is_telsalevisit > 0 ? <span className="c_orange">回访</span> : null}
                    {list.queueinfo.is_notstandard > 0 ? <span className="c_red">未达标</span> : null}
                    {list.queueinfo.is_7expire > 0 ? <span className="c_orange">7天到期</span> : null}
                    {list.queueinfo.is_7open > 0 ? <span className="c_green">7天开通</span> : null}
                  </div>
                </td>
                <td className="bor_r0">{list.queueinfo.queuetime_view}</td>
              </tr>
            )}
            </tbody>
          </table>
          <p className="callnum">
            共找到待呼叫记录 <span>{data.total}</span> 条，经纪人 <span>{data.brokernum}</span> 个。
          </p>
        </div>
    )
  }
}
