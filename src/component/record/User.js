/**
 * Created by zhouzhen on 2017/4/30.
 */
import React, {Component, PropTypes} from 'react';
export default class User extends Component {
  render() {
    return (
      <div class="log-con-bd">
        <table class="agent-table" id="agent-table" cellpadding="0" cellspacing="0">
          <colgroup>
            <col width="30">
              <col width="144">
                <col width="546">
                  <col>
          </colgroup>
          <tbody>
          <tr>
            <td class="pd-1">
              <a href="" class="avatar">
                <img src="{{$info.basicinfo.picurl}}" alt="">
                  {{if $info.statinfo.b_core_shop}}
                  <em class="agent-tag"></em>
                  {{/if}}
              </a>
            </td>
            <td class="pd-2">
              <div class="info-con">
                <a class="name">{{$info.basicinfo.name}}  {{$info.basicinfo.mobile}}  </a>
                <figure class="company">
                  所属公司：
                  {{if $info.basicinfo.companyshortname}}{{$info.basicinfo.companyshortname}}{{else}}{{$info.basicinfo.companyname}}{{/if}}<em>|</em>
                  {{$info.basicinfo.bareaname}}<em>|</em>
                  {{$info.basicinfo.sareaname}}<em>|</em>
                  {{if $info.basicinfo.storeshortname}}{{$info.basicinfo.storeshortname}}{{else}}{{$info.basicinfo.storename}}{{/if}}<em>|</em>
                  {{if $info.basicinfo.shopshortname}}{{$info.basicinfo.shopshortname}}{{else}}{{$info.basicinfo.shopname}}{{/if}}</figure>
                <figure class="region">责任销售：{{if $info.saleinfo.major.name}}<span>{{$info.saleinfo.major.name}}({{$info.saleinfo.major.rank_code}})</span><em>|</em><span>{{$info.saleinfo.major.parent_name}}</span><em>|</em><span>{{$info.saleinfo.major.group_name}}</span>{{else}}无{{/if}}</figure>
                <div class="bom-box g-line">
                  <ul class="ag-Info">
                    <li>
                      <span><em>入职时间：</em>{{$info.basicinfo.workstart}}</span>
                    </li>
                    <li class="g-line">
                      <span class="g-u"><em>最近拜访时间：</em>{{$info.visitinfo.lastdate|default:'未拜访'}}</span>
                      <span class="g-lastu"><em>30天内拜访次数：</em>{{$info.visitinfo.num|default:'0'}}</span>
                    </li>
                    <li class="g-line">
                      <span class="g-u"><em>最近客户意向：</em>{{if not $info.visitinfo.buylevel.code}}--{{else}}{{$info.visitinfo.buylevel.code|default:'-'}}<em>（{{$info.visitinfo.buylevel.name|default:'-'}}）{{/if}}</em></span>
                      <span class="g-lastu"><em>乐居端口在线时间：</em>{{$info.statinfo.useday|default:'--'}}天</span>
                    </li>
                  </ul>
                </div>
              </div>
            </td>
            <td class="pd-3">
              <div class="mar_b18">
                <ul class="g-line box-h box-products">
                  <li class="l-tit">使用产品：{{if not $info.payinfo.all}}<strong>免费版</strong>{{/if}}</li>
                  {{if $info.payinfo.all}}
                  <li>
                    {{section loop=$info.payinfo.all name=index}}
                    <p><strong>{{$info.payinfo.all[index].ucname|replace:'V':'<em class="v-s">V</em>'}}</strong><q>|</q><span>{{$info.payinfo.all[index].startdate}}-{{$info.payinfo.all[index].enddate}}</span></p>
                    {{/section}}
                  </li>
                  {{/if}}
                  {{if $info.payinfo.up}}
                  <li class="l-tit">上次使用版本：</li>
                  <li>
                    <p><strong>{{$info.payinfo.up.ucname|replace:'V':'<em class="v-s">V</em>'}}</strong><q>|</q><span>{{$info.payinfo.up.enddate}}下线</span></p>
                  </li>
                  {{/if}}
                </ul>
                <div class="add-num-bg dn">
                  <span class="addBtn_normal"></span>
                  <div class="mes_more dn"></div>
                </div>
                <ul>
                  <li><span class="col-8">30天内到访客源量：</span>{{$info.statinfo.last30click|default:'0'}}次</li>
                </ul>
                {{if $info.visitinfo.network}}
                <ul class="g-line box-h">
                  <li class="l-tit g-u">竞对产品：</li>
                  <li class="fl g-last">
                    {{foreach from=$info.visitinfo.network key=net_key item=net_item}}
                    <p><a href="">{{$net_item.name}}</a><q>|</q><em class="{{if $net_item.num>0}}c_red{{else}}c_gray{{/if}}">{{if $net_item.num>0}}有{{else}}无{{/if}}成交</em></p>
                    {{/foreach}}
                  </li>
                </ul>
                {{/if}}
              </div>
            </td>
            {{if $info.statinfo.b_core_shop neq 0 or $info.statinfo.expire_after_7days neq 0 or $info.statinfo.open_in_7days neq 0 or $info.statinfo.usaged_not_standard neq 0 or $info.statinfo.tradenum neq 0 or $info.statinfo.giftnum neq 0 or $info.statinfo.expire_in_60days_ago neq 0 or $info.statinfo.high_intention_num neq 0}}
            <td class="pd-4 pr">
              <figure class="r-info">
                {{if $info.statinfo.b_core_shop neq 0}}
                <ul class="g-line box-h">
                  <li class="g-u l-tit"><span class="tg tg-jjr"><em></em>核心经纪人</span></li>
                  <li class="g-lastu">
                    <p>成交{{$info.visitinfo.tradenum}}个<q>|</q>使用时间{{$info.statinfo.useday}}天</p>
                  </li>
                </ul>
                {{/if}}
                {{if $info.statinfo.tradenum neq 0}}
                <ul class="g-line box-h">
                  <li class="g-u l-tit"><span class="tag t-cj"><q class="col-w">乐居成交</q><em>{{$info.statinfo.tradenum}}</em></span></li>
                  <li class="g-lastu">
                    {{section loop=$info.visitinfo.tradelist name=index}}
                    <p>{{$info.visitinfo.tradelist[index].tradetime}} <q>|</q>{{$info.visitinfo.tradelist[index].communityname}}<q>|</q>{{$info.visitinfo.tradelist[index].room}}居<q>|</q>{{$info.visitinfo.tradelist[index].buildingarea}}平<q>|</q>{{$info.visitinfo.tradelist[index].tradeprice}}万元</p>
                    {{/section}}
                  </li>
                </ul>
                {{/if}}
                {{if $info.statinfo.usaged_not_standard neq 0}}
                <ul class="g-line box-h">
                  <li class="g-u l-tit"><span class="tag t-wdb"><q class="col-w">未达标</q><em>{{$info.statinfo.usaged_not_standard}}</em></span></li>
                  <li class="g-lastu">
                    <p>
                      {{foreach from=$info.statinfo.not_standard_item_list key=not_key item=not_item name=notlist}}
                      <a href="#">{{$not_item}}</a>{{if !$smarty.foreach.notlist.last}}<q>|</q>{{/if}}
                      {{/foreach}}
                    </p>
                  </li>
                </ul>
                {{/if}}
                {{if $info.statinfo.expire_after_7days neq 0}}
                <ul class="g-line box-h">
                  <li class="g-u l-tit"><span class="tag t-7tdq"><q class="col-w">7天到期</q><em>{{$info.statinfo.expire_after_7days}}</em></span></li>
                  <li class="g-lastu">
                    {{section loop=$info.payinfo.end name=index }}
                    <p><strong>{{$info.payinfo.end[index].ucname|replace:'V':'<em class="v-s">V</em>'}}</strong><q>|</q>&nbsp;{{$info.payinfo.end[index].enddate}}</p>
                    {{/section}}
                  </li>
                </ul>
                {{/if}}
                {{if $info.statinfo.open_in_7days neq 0}}
                <ul class="g-line box-h">
                  <li class="g-u l-tit"><span class="tag t-7tkt"><q class="col-w">7天开通</q><em>{{$info.statinfo.open_in_7days}}</em></span></li>
                  <li class="g-lastu">
                    {{section loop=$info.payinfo.start name=index}}
                    <p><strong>{{$info.payinfo.start[index].ucname|replace:'V':'<em class="v-s">V</em>'}}</strong><q>|</q>&nbsp;{{$info.payinfo.start[index].startdate}}</p>
                    {{/section}}
                  </li>
                </ul>
                {{/if}}
                {{if $info.statinfo.expire_in_60days_ago neq 0}}
                <ul class="g-line box-h">
                  <li class="g-u l-tit"><span class="tag t-60txx"><q>60天下线</q><em>{{$info.statinfo.expire_in_60days_ago}}</em></span></li>
                  <li class="g-lastu">
                    {{section loop=$info.payinfo.down60 name=index}}
                    <p><strong>{{$info.payinfo.down60[index].ucname|replace:'V':'<em class="v-s">V</em>'}}</strong><q>|</q>&nbsp;{{$info.payinfo.down60[index].enddate}}</p>
                    {{/section}}
                  </li>
                </ul>
                {{/if}}
                {{if $info.statinfo.giftnum neq 0}}
                <ul class="g-line box-h">
                  <li class="g-u l-tit"><span class="tag t-lp"><q>礼品</q><em>{{$info.statinfo.giftnum}}</em></span></li>
                </ul>
                {{/if}}
                {{if $info.statinfo.high_intention_num neq 0}}
                <ul class="g-line box-h">
                  <li class="g-u l-tit"><span class="tag t-7tkt"><q>电销可面见</q><em>{{$info.statinfo.high_intention_num}}</em></span></li>
                </ul>
                {{/if}}
              </figure>
              <!--超出部分折叠-->
              <div class="add-num-bg dn">
                <span class="addBtn_normal"></span>
                <div class="mes_more dn">
                </div>
              </div>
            </td>
            {{else}}
            <td class="pd-4">
              <figure class="r-info xk_bg0 pr">
                <div class="xk_null"></div>
              </figure>
            </td>
            {{/if}}
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
}