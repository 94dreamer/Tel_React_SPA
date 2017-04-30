/**
 * Created by zhouzhen on 2017/4/30.
 */
import React, {Component, PropTypes} from 'react';
export  default class History extends Component {
  render(){
    return (
      <div class="record_newCon">
        <div class="record_4">
          <h2><em></em>拜访历史</h2>
          <div class="con">
            <ul class="main-title">
              <li {{if $list.type eq 2}}class="current"{{/if}}><a href="/saletel/record?citycode={{$request.citycode}}&uid={{$request.uid}}&groupid={{$request.groupid}}&currcity={{$request.currcity}}&type=2"> 电销呼叫历史（{{$list.tel_total}}）</a></li>
              <li {{if $list.type eq 1}}class="current"{{/if}}><a href="/saletel/record?citycode={{$request.citycode}}&uid={{$request.uid}}&groupid={{$request.groupid}}&currcity={{$request.currcity}}&type=1"> 销售拜访历史（{{$list.total}}）</a></li>
            </ul>
            {{if $list.type eq 1 and $list.total eq 0 || $list.type eq 2 and $list.tel_total eq 0}}
            <div class="side-null"></div>
            {{else}}
            <div class="log-table log-table-tel detail-table">
              <table cellpadding="0" cellspacing="0" width="100%">
                {{if $list.type eq 1}}
                <tr>
                  <th width="10%">拜访时间</th>
                  <th width="10%">销售</th>
                  <th width="10%">客户意向</th>
                  <th width="10%">是否已面见</th>
                  <th width="10%">拜访类型</th>
                  <th width="10%">拜访方式</th>
                  <th width="40%" class="bor_r0">沟通详情</th>
                </tr>
                {{foreach from=$list.list item=item}}
                <tr data-id="{{$item.id}}">
                  <td>{{$item.visittime}}</td>
                  <td>{{if 'hq'==$currcity}}{{$list.cityname}}-{{/if}}{{$item.sale}}</td>
                  <td>{{$item.intention}}</td>
                  <td>{{$item.hasbeenmet}}</td>
                  <td>{{$item.visittype}}</td>
                  <td>{{$item.visitway}}</td>
                  <td class="bor_r0" title="{{$item.talk_content}}">{{$item.talk_content_short}}</th>
                </tr>
                {{/foreach}}
                {{/if}}
                {{if $list.type eq 2}}
                <tr>
                  <th width="15%">电话沟通时间</th>
                  <th width="15%">电销</th>
                  <th width="15%">销售</th>
                  <th width="8%">客户意向</th>
                  <th width="40%">沟通详情</th>
                  <th width="7%" class="bor_r0">通话时长</th>
                </tr>
                {{foreach from=$list.tel_list item=item}}
                <tr data-id="{{$item.id}}">
                  <td>{{$item.visittime}}</td>
                  <td>{{$item.sale}}</td>
                  <td>{{if 'hq'==$currcity}}{{$list.cityname}}-{{/if}}{{$item.saleinfo_name}}</td>
                  <td>{{$item.intention}}</td>
                  <td title="{{$item.talk_content}}">{{$item.talk_content_short}}</td>
                  <td class="bor_r0">{{if $item.teltime}}{{$item.teltime}}{{else}}--{{/if}}</td>
                </tr>
                {{/foreach}}
                {{/if}}
              </table>
            </div>
            {{/if}}
          </div>
          <div class="pagination clearfix">
            {{$pagebox.html}}
          </div>
        </div>
      </div>
    )
  }
}