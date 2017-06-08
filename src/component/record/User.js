/**
 * Created by zhouzhen on 2017/4/30.
 */
import React, {Component, PropTypes} from 'react';
export default class User extends Component {
  componentDidMount() {
    console.log('User componentDidMount');
    this.props.agentInfoAjax(this.props.params);
  }

  render() {
    const $info = this.props.telagentinfo;
    console.log($info);
    if (!$info) {
      return null;
    }
    return (
      <div className="log-con-bd">
        <table className="agent-table" id="agent-table" cellPadding="0" cellSpacing="0">
          <tbody>
          <tr>
            <td className="pd-1" width={30}>
              <a href="" className="avatar">
                <img src={$info.basicinfo.picurl} alt=""/>
                {$info.statinfo.b_core_shop > 0 && <em className="agent-tag"/>}
              </a>
            </td>
            <td className="pd-2" width={144}>
              <div className="info-con">
                <a className="name">{$info.basicinfo.name} {$info.basicinfo.mobile}</a>
                <figure className="company">
                  所属公司：
                  {$info.basicinfo.companyshortname ? $info.basicinfo.companyshortname : $info.basicinfo.companyname}<em>|</em>
                  {$info.basicinfo.bareaname}<em>|</em>
                  {$info.basicinfo.sareaname}<em>|</em>
                  {$info.basicinfo.storeshortname ? $info.basicinfo.storeshortname : $info.basicinfo.storename}<em>|</em>
                  {$info.basicinfo.shopshortname ? $info.basicinfo.shopshortname : $info.basicinfo.shopname}</figure>
                <figure className="region">
                  责任销售：{$info.saleinfo.major.name ?
                  <span>
                    <span>{$info.saleinfo.major.name}({$info.saleinfo.major.rank_code})</span><em>|</em>
                    <span>{$info.saleinfo.major.parent_name}</span><em>|</em>
                    <span>{$info.saleinfo.major.group_name}</span>
                  </span>
                  : '无'}</figure>
                <div className="bom-box g-line">
                  <ul className="ag-Info">
                    <li>
                      <span><em>入职时间：</em>{$info.basicinfo.workstart}</span>
                    </li>
                    <li className="g-line">
                      <span className="g-u"><em>最近拜访时间：</em>{$info.visitinfo.lastdate || '未拜访'}</span>
                      <span className="g-lastu"><em>30天内拜访次数：</em>{$info.visitinfo.num || '0'}</span>
                    </li>
                    <li className="g-line">
                      <span
                        className="g-u"><em>最近客户意向：</em>{$info.visitinfo.buylevel && $info.visitinfo.buylevel.code ? $info.visitinfo.buylevel.code : '--' }<em>（{($info.visitinfo.buylevel && $info.visitinfo.buylevel.name) || '-'}）</em></span>
                      <span className="g-lastu"><em>乐居端口在线时间：</em>{$info.statinfo.useday || '--'}天</span>
                    </li>
                  </ul>
                </div>
              </div>
            </td>
            <td className="pd-3" width={546}>
              <div className="mar_b18">
                <ul className="g-line box-h box-products">
                  <li className="l-tit">使用产品：{!$info.payinfo.all && <strong>免费版</strong>}</li>
                  {$info.payinfo.all &&
                  <li>
                    {$info.payinfo.all.map(item => {
                      return (<p key={item.ucid}>
                        <strong>{item.ucname.replace('V', '<em className="v-s">V</em>')}</strong><q>|</q><span>{item.startdate}-{item.enddate}</span>
                      </p>)
                    })}
                  </li>}

                  {$info.payinfo.up &&
                  <li className="l-tit">上次使用版本：</li>
                  }
                  {$info.payinfo.up &&
                  <li>
                    <p>
                      <strong>{$info.payinfo.up.ucname.replace('V', '<em className="v-s">V</em>')}</strong><q>|</q><span>{$info.payinfo.up.enddate}下线</span>
                    </p>
                  </li>
                  }
                </ul>
                <div className="add-num-bg dn">
                  <span className="addBtn_normal"></span>
                  <div className="mes_more dn"></div>
                </div>
                <ul>
                  <li><span className="col-8">30天内到访客源量：</span>{$info.statinfo.last30click || '0'}次</li>
                </ul>
                {$info.visitinfo.network &&
                <ul className="g-line box-h">
                  <li className="l-tit g-u">竞对产品：</li>
                  <li className="fl g-last">
                    {Object.keys($info.visitinfo.network).map(index => {
                      let item = $info.visitinfo.network[index];
                      return (<p key={item.name}><a href="">{item.name}</a><q>|</q><em
                        className={item.num > 0 ? 'c_red' : 'c_gray'}>{item.num > 0 ? '有' : '无'}成交</em>
                      </p>)
                    })}
                  </li>
                </ul>}
              </div>
            </td>
            {$info.statinfo.b_core_shop != 0 || $info.statinfo.expire_after_7days != 0 || $info.statinfo.open_in_7days != 0 || $info.statinfo.usaged_not_standard != 0 || $info.statinfo.tradenum != 0 || $info.statinfo.giftnum != 0 || $info.statinfo.expire_in_60days_ago != 0 || $info.statinfo.high_intention_num != 0 ?
              <td className="pd-4 pr">
                <figure className="r-info">
                  {$info.statinfo.b_core_shop != 0 &&
                  <ul className="g-line box-h">
                    <li className="g-u l-tit"><span className="tg tg-jjr"><em></em>核心经纪人</span></li>
                    <li className="g-lastu">
                      <p>成交{$info.visitinfo.tradenum}个<q>|</q>使用时间{$info.statinfo.useday}天</p>
                    </li>
                  </ul>
                  }
                  {$info.statinfo.tradenum != 0 &&
                  <ul className="g-line box-h">
                    <li className="g-u l-tit"><span className="tag t-cj"><q
                      className="col-w">乐居成交</q><em>{$info.statinfo.tradenum}</em></span></li>
                    <li className="g-lastu">
                      {$info.visitinfo.tradelist.map(item => {
                        return (
                          <p key={item.tradetime+item.sinaid+item.communityname}>{item.tradetime}
                            <q>|</q>{item.communityname}<q>|</q>{item.room}居<q>|</q>{item.buildingarea}平<q>|</q>{item.tradeprice}万元
                          </p>
                        )
                      })}
                    </li>
                  </ul>
                  }
                  {$info.statinfo.usaged_not_standard != 0 &&
                  <ul className="g-line box-h">
                    <li className="g-u l-tit"><span className="tag t-wdb"><q
                      className="col-w">未达标</q><em>{$info.statinfo.usaged_not_standard}</em></span></li>
                    <li className="g-lastu">
                      <p>
                        {Object.keys($info.statinfo.not_standard_item_list).map((index, dex) => {
                          return (<span key={dex}>
                            {dex = !0 && <q>|</q>}
                            <a>{$info.statinfo.not_standard_item_list[index]}</a>
                          </span>)
                        })}
                      </p>
                    </li>
                  </ul>
                  }
                  {$info.statinfo.expire_after_7days != 0 &&
                  <ul className="g-line box-h">
                    <li className="g-u l-tit"><span className="tag t-7tdq"><q
                      className="col-w">7天到期</q><em>{$info.statinfo.expire_after_7days}</em></span></li>
                    <li className="g-lastu">
                      {$info.payinfo.end.map(item => <p key={item.ucid}>
                        <strong>{item.ucname.replace('V', '<em className="v-s">V</em>')}</strong><q>|</q>&nbsp;{item.enddate}
                      </p>)}
                    </li>
                  </ul>}
                  {$info.statinfo.open_in_7days != 0 &&
                  <ul className="g-line box-h">
                    <li className="g-u l-tit"><span className="tag t-7tkt"><q
                      className="col-w">7天开通</q><em>{$info.statinfo.open_in_7days}</em></span></li>
                    <li className="g-lastu">
                      {$info.payinfo.start.map(item => <p key={item.ucid}>
                        <strong>{item.ucname.replace('V', '<em className="v-s">V</em>')}</strong><q>|</q>&nbsp;{$info.payinfo.start[index].startdate}
                      </p>)}
                    </li>
                  </ul>}
                  {$info.statinfo.expire_in_60days_ago != 0 &&
                  <ul className="g-line box-h">
                    <li className="g-u l-tit"><span
                      className="tag t-60txx"><q>60天下线</q><em>{$info.statinfo.expire_in_60days_ago}</em></span></li>
                    <li className="g-lastu">
                      {$info.payinfo.down60.map(item => <p key={item.ucid}>
                        <strong>{item.ucname.replace('V', '<em className="v-s">V</em>')}</strong><q>|</q>&nbsp;{item.enddate}
                      </p>)}
                    </li>
                  </ul>}
                  {$info.statinfo.giftnum != 0 &&
                  <ul className="g-line box-h">
                    <li className="g-u l-tit"><span
                      className="tag t-lp"><q>礼品</q><em>{$info.statinfo.giftnum}</em></span>
                    </li>
                  </ul>}
                  {$info.statinfo.high_intention_num != 0 &&
                  <ul className="g-line box-h">
                    <li className="g-u l-tit"><span
                      className="tag t-7tkt"><q>电销可面见</q><em>{$info.statinfo.high_intention_num}</em></span></li>
                  </ul>}
                </figure>
                <div className="add-num-bg dn">
                  <span className="addBtn_normal"/>
                  <div className="mes_more dn">
                  </div>
                </div>
              </td>
              :
              <td className="pd-4">
                <figure className="r-info xk_bg0 pr">
                  <div className="xk_null"/>
                </figure>
              </td>
            }
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
}