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
    const agent=this.props.telAgent
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
                {agent.statinfo.b_core_shop=='1'?<em className="agent-tag"></em>:null}
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
                  <a data-href="<%=basicinfo.detailurl%>">{agent.basicinfo.storeshortname||basicinfo.storename}</a><em>|</em>
                  <a data-href="<%=basicinfo.detailurl%>">{agent.basicinfo.shopshortname||basicinfo.shopname}</a>
                </figure>
                {agent.saleinfo.major?
                <figure className="region">
                  责任销售：<span>{agent.saleinfo.major.name}({agent.saleinfo.major.rank_code})</span><em>|</em><span>{agent.saleinfo.major.parent_name}</span><em>|</em><span>{agent.saleinfo.major.group_name}</span>
                </figure>:
                <figure className="region">
                  责任销售：无
                </figure>}
                <div className="bom-box g-line">
                  <ul className="ag-Info">
                    <li>
                      <span><em>入职时间：</em>{agent.basicinfo.workstart>0?agent.basicinfo.workstart:"--"}</span>
                    </li>
                    <li className="g-line">
                      <span className="g-u"><em>最近拜访时间：</em>
                        {agent.visitinfo.lastdate?agent.visitinfo.lastdate:"未拜访"}
                      </span>
                      <span className="g-lastu"><em>30天内拜访次数：</em>
                        {agent.visitinfo.num?agent.visitinfo.num:"0"}
                      </span>
                    </li>
                    <li className="g-line">
                  <span className="g-u"><em>最近客户意向：</em>
                    {agent.visitinfo.buylevel?(!agent.visitinfo.buylevel.code?"--":agent.visitinfo.buylevel.code)(visitinfo.buylevel.name? <em>（{agent.visitinfo.buylevel.name}）</em>:null):"--"}
                  </span>
                      <span className="g-lastu"><em>乐居端口在线时间：</em>
                        {agent.statinfo.useday?agent.statinfo.useday:0}天
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </td>
            <td className="pd-3">
              <div className="mar_b18">
                <ul className="g-line box-h box-products">
                  <li className="l-tit">使用产品：{(!payinfo || !payinfo.all || !payinfo.all.length)?<strong>免费版</strong>:null}</li>
                  <%if(payinfo&&payinfo.all&&payinfo.all.length){%>
                  <li>
                  <%for(var i = 0;i< payinfo.all.length;i++){%>
                  <p>
                  <strong><%=payinfo.all[i].ucname.split('V')[0]%></strong><%if(payinfo.all[i].ucname.split('V').length>1){%><em className="v-s">V</em><%}%><q>|</q>
                  <%=payinfo.all[i].startdate%>-<%=payinfo.all[i].enddate%>
                  <%if('2'==payinfo.all[i].b_sanqian){%><em className="i_gong"></em><%}%>
                  <%if('1'==payinfo.all[i].b_sanqian){%><em className="i_zi"></em><%}%>
                  </p>
                  <%}%>
                  </li>
                  <%}%>
                  <
                  %if(payinfo && payinfo.up && payinfo.up.ucname){%>
                  <li className="l-tit">上次使用版本：</li>
                  <li>
                  <p>
                  <strong><%=payinfo.up.ucname.split('V')[0]%></strong><%if(payinfo.up.ucname.split('V').length>1){%><em className="v-s">V</em><%}%><q>|</q>
                  <span><%=payinfo.up.enddate%>下线</span></p>
              </li>
              <%}%>
                </ul>
                <div className="add-num-bg dn">
                  <span className="addBtn_normal"></span>
                  <div className="mes_more dn"></div>
                </div>
                <ul>
                  <li><span className="col-8">30天内到访客源量：</span>
                    <
                    %if(statinfo.last30click){%><%=statinfo.last30click%><%} else{%>0<%}%>次</li>
                </ul>
                <
                %if(visitinfo && visitinfo.network){%>
                <ul className="g-line box-h">
                <li className="l-tit g-u">竞对产品：</li>
                <li className="fl g-last">
                <%for(i in visitinfo.network){%>
                  <p>
                  <a><%=visitinfo.network[i].name%></a><q>|</q>
                  <em className="<%if(parseInt(visitinfo.network[i].num)>0){%>c_red<%}else{%>c_gray<%}%>"><%if(parseInt(visitinfo.network[i].num)>0){%>有<%}else{%>无<%}%>成交</em>
                  </p>
                  <%}%>
                </li>
                </ul>
                <%}%>
              </div>
            </td>
            <
            %if(statinfo.expire_after_7days=='0'&&statinfo.open_in_7days=='0'&&statinfo.tradenum=='0'
            &&statinfo.usaged_not_standard=='0'&&statinfo.high_intention_num=='0'){%>
            <td className="pd-4">
            <figure className="r-info xk_bg0 pr">
            <div className="xk_null"></div>
            </figure>
            </td>
            <%} else{%>
            <td className="pd-4 pr">
            <figure className="r-info">
            <%if(statinfo.tradenum&&statinfo.tradenum!='0'){%>
            <ul className="g-line box-h">
            <li className="g-u l-tit"><span className="tag t-cj"><q>乐居成交</q><em><%=visitinfo.tradenum+0%></em></span></li>
            <li className="g-lastu">
            <%for(var i=0;i< visitinfo.tradelist.length;i++){%>
            <p><%=visitinfo.tradelist[i].tradetime%><q>|</q><%=visitinfo.tradelist[i].communityname%><q>|</q><%=visitinfo.tradelist[i].room%>居<q>|</q><%=visitinfo.tradelist[i].buildingarea%>平<q>|</q><%=visitinfo.tradelist[i].tradeprice%>万元</p>
            <%}%>
            </li>
            </ul>
            <%}%>
            <%if(statinfo.usaged_not_standard&&statinfo.usaged_not_standard!='0'){%>
            <ul className="g-line box-h">
            <li className="g-u l-tit"><span className="tag t-wdb"><q>未达标</q><em><%=statinfo.usaged_not_standard%></em></span></li>
            <li className="g-lastu">
            <p>
            <%var tempCount=0;%>
            <%for(i in statinfo.not_standard_item_list){%>
            <%if(tempCount>0){%><q>|</q><%}%><%=statinfo.not_standard_item_list[i]%>
            <%tempCount++;%>
            <%}%>
            </p>
            </li>
            </ul>
            <%}%>
            <%if(statinfo.expire_after_7days&&statinfo.expire_after_7days!='0'){%>
            <ul className="g-line box-h">
            <li className="g-u l-tit"><span className="tag t-7tdq"><q>7天到期</q><em><%=statinfo.expire_after_7days%></em></span></li>
            <li className="g-lastu">
            <%for(var i=0;i< payinfo.end.length;i++){%>
            <p>
            <strong><%=payinfo.end[i].ucname.split('V')[0]%></strong>
            <%if(payinfo.end[i].ucname.split('V').length>1){%><em className="v-s">V</em><%}%>&nbsp;<%=payinfo.end[i].enddate%>
            <%if('2'==payinfo.end[i].b_sanqian){%><em className="i_gong"></em><%}%>
            <%if('1'==payinfo.end[i].b_sanqian){%><em className="i_zi"></em><%}%>
            </p>
            <%}%>
            </li>
            </ul>
            <%}%>
            <%if(statinfo.open_in_7days&&statinfo.open_in_7days!='0'){%>
              <ul className="g-line box-h">
              <li className="g-u l-tit"><span className="tag t-7tkt"><q>7天开通</q><em><%=statinfo.open_in_7days%></em></span></li>
              <li className="g-lastu">
              <%if(payinfo){%>
              <%for(var i=0;i< payinfo.start.length;i++){%>
              <p>
              <strong><%=payinfo.start[i].ucname.split('V')[0]%></strong>
              <%if(payinfo.start[i].ucname.split('V').length>1){%><em className="v-s">V</em><%}%>&nbsp;<%=payinfo.start[i].startdate%>
              <%if('2'==payinfo.start[i].b_sanqian){%><em className="i_gong"></em><%}%>
              <%if('1'==payinfo.start[i].b_sanqian){%><em className="i_zi"></em><%}%>
              </p>
              <%}%>
              <%}%>
              </li>
              </ul>
              <%}%>
            <%if(statinfo.expire_in_60days_ago&&statinfo.expire_in_60days_ago!='0'){%>
              <ul className="g-line box-h">
              <li className="g-u l-tit"><span className="tag t-60txx"><q>60天下线</q><em><%=statinfo.expire_in_60days_ago%></em></span></li>
              <li className="g-lastu">
              <%if(payinfo.down60.length){%>
              <%for(var i=0;i< payinfo.down60.length;i++){%>
              <p>
              <strong><%=payinfo.down60[i].ucname.split('V')[0]%></strong>
              <%if(payinfo.down60[i].ucname.split('V').length>1){%><em className="v-s">V</em><%}%>&nbsp;<%=payinfo.down60[i].startdate%>
              <%if('2'==payinfo.down60[i].b_sanqian){%><em className="i_gong"></em><%}%>
              <%if('1'==payinfo.down60[i].b_sanqian){%><em className="i_zi"></em><%}%>
              </p>
              <%}%>
              <%}%>
              </li>
              </ul>
              <%}%>
            <%if(statinfo.giftnum&&statinfo.giftnum!='0'){%>
              <ul className="g-line box-h">
              <li className="g-u l-tit"><span className="tag t-lp"><q>礼品</q><em><%=statinfo.giftnum%></em></span></li>
              </ul>
              <%}%>
            <%if(statinfo.high_intention_num&&statinfo.high_intention_num!='0'){%>
              <ul className="g-line box-h">
              <li className="g-u l-tit"><span className="tag t-7tkt"><q>电销可面见</q><em><%=statinfo.high_intention_num%></em></span></li>
              </ul>
              <%}%>
            </figure>
            <!--超出部分折叠-->
            <div className="add-num-bg dn">
            <span className="addBtn_normal"></span>
            <div className="mes_more dn"></div>
            </div>
            </td>
            <%}%>
          </tr>
          </tbody>
        </table>
      </div>
  }
  )}
  }
  export default WorkAgent;
