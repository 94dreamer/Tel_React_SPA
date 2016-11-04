/**
 * Created by zz on 2016/11/3.
 */
import React,{ Component } from 'react';
import {connect} from 'react-redux';

class WorkAgent extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const agent = this.props.telAgent
    return (
      <div className="log-con-bd">
        <table className="agent-table" cellpadding="0" cellspacing="0">
          <colgroup>
            <col width="10%"/>
            <col width="30%"/>
            <col width="30%"/>
            <col />
          </colgroup>
          <tbody>
          <tr>
            <td className="pd-1">
              <a data-href={agent.basicinfo.detailurl} className="avatar">
                <img src={agent.basicinfo.picurl} alt="经纪人头像"/>
                {agent.statinfo.b_core_shop == '1' ? <em className="agent-tag"></em> : null}
              </a>
            </td>
            <td className="pd-2">
              <div className="info-con">
                <a className="name">
                  {agent.basicinfo.name}
                  {agent.basicinfo.mobile}
                </a>
                <figure className="company">
                  所属公司：
                  <a data-href="<%=basicinfo.detailurl%>">{agent.basicinfo.companyshortname}</a><em>|</em>
                  <a data-href="<%=basicinfo.detailurl%>">{agent.basicinfo.bareaname}</a><em>|</em>
                  <a data-href="<%=basicinfo.detailurl%>">{agent.basicinfo.sareaname}</a><em>|</em>
                  <a data-href="<%=basicinfo.detailurl%>">{agent.basicinfo.storeshortname || basicinfo.storename}</a><em>|</em>
                  <a data-href="<%=basicinfo.detailurl%>">{agent.basicinfo.shopshortname || basicinfo.shopname}</a>
                </figure>
                {agent.saleinfo.major ?
                  <figure className="region">
                    责任销售：<span>{agent.saleinfo.major.name}({agent.saleinfo.major.rank_code})</span><em>|</em><span>{agent.saleinfo.major.parent_name}</span><em>|</em><span>{agent.saleinfo.major.group_name}</span>
                  </figure> :
                  <figure className="region">
                    责任销售：无
                  </figure>}
                <div className="bom-box g-line">
                  <ul className="ag-Info">
                    <li>
                      <span><em>入职时间：</em>{agent.basicinfo.workstart > 0 ? agent.basicinfo.workstart : "--"}</span>
                    </li>
                    <li className="g-line">
                      <span className="g-u"><em>最近拜访时间：</em>
                        {agent.visitinfo.lastdate ? agent.visitinfo.lastdate : "未拜访"}
                      </span>
                      <span className="g-lastu"><em>30天内拜访次数：</em>
                        {agent.visitinfo.num ? agent.visitinfo.num : "0"}
                      </span>
                    </li>
                    <li className="g-line">
                  <span className="g-u"><em>最近客户意向：</em>
                    {agent.visitinfo.buylevel ? (!agent.visitinfo.buylevel.code ? "--" : agent.visitinfo.buylevel.code)(visitinfo.buylevel.name ?
                      <em>（{agent.visitinfo.buylevel.name}）</em> : null) : "--"}
                  </span>
                      <span className="g-lastu"><em>乐居端口在线时间：</em>
                        {agent.statinfo.useday ? agent.statinfo.useday : 0}天
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </td>
            <td className="pd-3">
              <div className="mar_b18">
                <ul className="g-line box-h box-products">
                  <li className="l-tit">使用产品：{(!payinfo || !payinfo.all || !payinfo.all.length) ?
                    <strong>免费版</strong> : null}</li>
                  <li>
                    {agent.payinfo && agent.payinfo.all && agent.payinfo.all.length ? payinfo.all.map(item=>
                      <p>
                        <strong>{item.ucname.split('V')[0]}</strong>{item.ucname.split('V').length > 1 ?
                        <em className="v-s">V</em> : null}<q>|</q>
                        {item.startdate}-{item.enddate}
                        {'2' == item.b_sanqian ? <em className="i_gong"></em> : null}
                        {'1' == item.b_sanqian ? <em className="i_zi"></em> : null}
                      </p>) : null
                    }
                  </li>
                  {payinfo && payinfo.up && payinfo.up.ucname ? <li className="l-tit">上次使用版本：</li> : null}
                  {payinfo && payinfo.up && payinfo.up.ucname ?
                    <li><p>
                      <strong>{agent.payinfo.up.ucname.split('V')[0]}</strong>{agent.payinfo.up.ucname.split('V').length > 1 ?
                      <em className="v-s">V</em> : null}<q>|</q>
                      <span>{agent.payinfo.up.enddate}下线</span></p>
                    </li>
                    : null}
                </ul>
                <div className="add-num-bg dn">
                  <span className="addBtn_normal"></span>
                  <div className="mes_more dn"></div>
                </div>
                <ul>
                  <li><span className="col-8">30天内到访客源量：</span>{agent.statinfo.last30click ? statinfo.last30click : 0}次
                  </li>
                </ul>
                {agent.visitinfo && agent.visitinfo.network ?
                  <ul className="g-line box-h">
                    <li className="l-tit g-u">竞对产品：</li>
                    <li className="fl g-last">
                      {Object.keys(agent.visitinfo.network).map(i=>
                        <p>
                          <a>{agent.visitinfo.network[i].name}</a><q>|</q>
                          <em className={parseInt(agent.visitinfo.network[i].num)>0?"c_red":"c_gray"}>{parseInt(agent.visitinfo.network[i].num) > 0 ? "有" : "无"}成交</em>
                        </p>
                      )}
                    </li>
                  </ul> : null}
              </div>
            </td>
            {agent.statinfo.expire_after_7days == '0' && statinfo.open_in_7days == '0' && statinfo.tradenum == '0' && statinfo.usaged_not_standard == '0' && statinfo.high_intention_num == '0' ?
              <td className="pd-4">
                <figure className="r-info xk_bg0 pr">
                  <div className="xk_null"></div>
                </figure>
              </td>
              :
              <td className="pd-4 pr">
                <figure className="r-info">
                  {agent.statinfo.tradenum && statinfo.tradenum != '0' ?
                    <ul className="g-line box-h">
                      <li className="g-u l-tit">
                        <span className="tag t-cj"><q>乐居成交</q><em>{agent.visitinfo.tradenum + 0}</em></span></li>
                      <li className="g-lastu">
                        {agent.visitinfo.tradelist.map(item=>
                          <p>{item.tradetime}<q>|</q>{item.communityname}<q>|</q>{item.room}居<q>|</q>{item.buildingarea}平<q>|</q>{item.tradeprice}万元
                          </p>)}
                      </li>
                    </ul>
                    : null}
                  {agent.statinfo.usaged_not_standard && agent.statinfo.usaged_not_standard > 0 ?
                    <ul className="g-line box-h">
                      <li className="g-u l-tit">
                        <span className="tag t-wdb"><q>未达标</q><em>{agent.statinfo.usaged_not_standard}</em></span></li>
                      <li className="g-lastu">
                        <p>
                          {Object.keys(agent.statinfo.not_standard_item_list).map(i, index=>
                            <span>{index > 0 ? <q>|</q> : null}{agent.statinfo.not_standard_item_list[i]}</span>)}
                        </p>
                      </li>
                    </ul>
                    : null}
                  {agent.statinfo.expire_after_7days && agent.statinfo.expire_after_7days > 0 ?
                    <ul className="g-line box-h">
                      <li className="g-u l-tit">
                        <span className="tag t-7tdq"><q>7天到期</q><em>{agent.statinfo.expire_after_7days}</em></span></li>
                      <li className="g-lastu">
                        {agent.payinfo.end.map(item=>
                          <p>
                            <strong>{item.ucname.split('V')[0]}</strong>{item.ucname.split('V').length > 1 ?
                            <em className="v-s">V</em> : null}&nbsp;{item.enddate}
                            {'2' == item.b_sanqian ? <em className="i_gong"/> : null}
                            {'1' == item.b_sanqian ? <em className="i_zi"/> : null}
                          </p>
                        )}
                      </li>
                    </ul>
                    : null}
                  {agent.statinfo.open_in_7days && agent.statinfo.open_in_7days > 0 ?
                    <ul className="g-line box-h">
                      <li className="g-u l-tit">
                        <span className="tag t-7tkt"><q>7天开通</q><em>{agent.statinfo.open_in_7days}</em></span></li>
                      <li className="g-lastu">
                        {agent.payinfo && agent.payinfo.start ? agent.payinfo.start.map(item=>
                          <p>
                            <strong>{item.ucname.split('V')[0]}</strong>
                            {item.ucname.split('V').length > 1 ?
                              <em className="v-s">V</em> : null}&nbsp;{item.startdate}
                            {'2' == item.b_sanqian ? <em className="i_gong"/> : null}
                            {'1' == item.b_sanqian ? <em className="i_zi"/> : null}
                          </p>
                        ) : null}
                      </li>
                    </ul> : null
                  }
                  {agent.statinfo.expire_in_60days_ago && agent.statinfo.expire_in_60days_ago > 0 ?
                    <ul className="g-line box-h">
                      <li className="g-u l-tit">
                        <span className="tag t-60txx"><q>60天下线</q><em>{agent.statinfo.expire_in_60days_ago}</em></span>
                      </li>
                      <li className="g-lastu">
                        {agent.payinfo.down60.length ?
                          agent.payinfo.down60.map(item=>
                            <p>
                              <strong>{item.ucname.split('V')[0]}</strong>
                              {item.ucname.split('V').length > 1 ?
                                <em className="v-s">V</em> : null}&nbsp;{item.startdate}
                              {'2' == item.b_sanqian ? <em className="i_gong"/> : null}
                              {'1' == item.b_sanqian ? <em className="i_zi"/> : null}
                            </p>
                          )
                          : null}
                      </li>
                    </ul> : null
                  }
                  {agent.statinfo.giftnum && agent.statinfo.giftnum > 0 ?
                    <ul className="g-line box-h">
                      <li className="g-u l-tit">
                        <span className="tag t-lp"><q>礼品</q><em>{agent.statinfo.giftnum}</em></span></li>
                    </ul> : null
                  }
                  {agent.statinfo.high_intention_num && agent.statinfo.high_intention_num > 0 ?
                    <ul className="g-line box-h">
                      <li className="g-u l-tit">
                        <span className="tag t-7tkt"><q>电销可面见</q><em>{agent.statinfo.high_intention_num}</em></span>
                      </li>
                    </ul>
                    : null}
                </figure>
                {/*超出部分折叠*/}
                <div className="add-num-bg dn">
                  <span className="addBtn_normal"></span>
                  <div className="mes_more dn"></div>
                </div>
              </td>
            }
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
export default WorkAgent;
