/**
 * Created by zz on 2016/10/28.
 */
import React,{Component} from 'react';
export default class UncallTab extends Component {

  render() {
    return
    !data.list.length?<div className="side-null"></div> :
      <div>
        <table cellpadding="0" cellspacing="0" width="100%">
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
          data.map(function(list,i){
            <tr>
              <td>{list.number}</td>
              (window.$_GET['groupid']?
              <td>
                <a target='_blank' href="/saletel/record?citycode={window.xkTel.citycode}&uid={list.basicinfo.uid}&groupid={window.$_GET['groupid']}">{list.basicinfo.name}</a>
              </td>
              :
              <td>
                <a target='_blank' href="/saletel/record?citycode={window.xkTel.citycode}&uid={list.basicinfo.uid}&jobid={window.$_GET['jobid']}">{list.basicinfo.name}</a>
              </td>
              )
              <td>{list.basicinfo.companyshortname} {list.basicinfo.storename}</td>
              <td>{list.saleinfo.name || ''}</td>
              <td>{list.saleinfo.parent_name || ''}-{list.saleinfo.group_name || ''}</td>
              <td>{list.visitinfo.ctime_view}</td>
              <td title={tel_content.join('\r')} style={{cursor: help}}></td>

              <td>
                <div className="tag_s clearfix">
                  (list.queueinfo.is_firstcall>0?<span className="c_blue">首次</span>:null)
                  (list.queueinfo.is_tempassign>0?<span className="c_purple">指派</span>:null)
                  (list.queueinfo.is_telsalevisit>0?<span className="c_orange">回访</span>:null)
                  (list.queueinfo.is_notstandard>0?<span className="c_red">未达标</span>:null)
                  (list.queueinfo.is_7expire>0?<span className="c_orange">7天到期</span>:null)
                  (list.queueinfo.is_7open>0?<span className="c_green">7天开通</span>:null)
                </div>
              </td>
              <td className="bor_r0">{list.queueinfo.queuetime_view}</td>
            </tr>
          })
          </tbody>
        </table>
        <p className="callnum">
          共找到待呼叫记录 <span>{data.total}</span> 条，经纪人 <span>{data.brokernum}</span> 个。
        </p>
      </div>
  }
}