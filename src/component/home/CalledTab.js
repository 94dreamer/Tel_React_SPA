/**
 * Created by zz on 2016/10/28.
 */
import React,{Component} from 'react';

export default class CalledTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = this.props.data;
    console.log(data)
    let isNull = !(data && data.list && data.list.length);
    return (
      isNull ?
        <div className="log-table log-table-sales"><div className="side-null" /></div> :
        <div className="log-table log-table-sales">
          <table cellPadding="0" cellSpacing="0" width="100%">
            <tbody>
            <tr>
              <th width="5%">序号</th>
              <th width="6%">客户姓名</th>
              <th width="8%">所属门店</th>
              <th width="8%">销售名称</th>
              <th width="10%">所属部组</th>
              <th width="8%">呼叫时间</th>
              <th width="8%">通话时长</th>
              <th width="10%">沟通详情</th>
              <th width="8%">意向程度</th>
              <th width="8%">呼叫状态</th>
              <th width="8%">电销标签</th>
              <th width="8%">电销姓名</th>
              {gArr['saleinfo'] && gArr['saleinfo'].position && gArr['saleinfo'].position == 6 ?
                <th className="bor_r0">操作</th> : null}
            </tr>
            {data.list.map(list=>
              <tr key={list.number+list.uid}>
                <td>{list.number}</td>
                {window.$_GET.groupid ?
                  <td>
                    <a target='_blank' href="">{list.basicinfo.name}</a>
                  </td>
                  :
                  <td>
                    <a target='_blank' href="">{list.basicinfo.name}</a>
                  </td>
                }
                <td>{list.basicinfo.companyshortname} {list.basicinfo.storename}</td>
                <td>{list.saleinfo.name}</td>
                <td>{list.saleinfo.parent_name}-{list.saleinfo.group_name}</td>
                <td>{list.visitinfo.ctime_view}</td>
                <td>{list.visitinfo.customerintention == 7 ? "--" : list.visitinfo.talk_time}</td>
                <td title={list.visitinfo.remark} style={{cursor: "help"}}>{list.visitinfo.remark && list.visitinfo.remark.slice(0,30)}</td>
                <td>{list.visitinfo.buylevel_view}</td>
                <td>{list.visitinfo.customerintention == 7 ? "呼叫失败" : "呼叫成功"}</td>
                <td>{list.visitinfo.visitlabel_view}</td>
                <td>{list.telsaleinfo ? (list.telsaleinfo.group_name+ '-' +list.telsaleinfo.name) : null}</td>
                {window.gArr['saleinfo'] && window.gArr['saleinfo'].position && window.gArr['saleinfo'].position == 6 ?
                  <td width="10%" className="bor_r0">
                    <a href="javascript:void(0);" className="callBtn" data-uid={list.basicinfo.uid} data-id={list.visitinfo.id} data-mobile={list.basicinfo.mobile} data-time={list.visitinfo.call_time}>呼叫</a>
                  </td> : null
                }
              </tr>
            )}
            </tbody>
          </table>
          <p className="callnum">
            共找到已呼叫记录 <span>{data.total}</span> 条,经纪人 <span>{data.brokernum}</span> 个。
          </p>
        </div>
    )
  }
}
