/**
 * Created by zz on 2016/8/19.
 */
import React,{Component} from 'react';
import FootPage from '../component/FootPage';

class Page1Bottom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    }
    this.turnPage = this.turnPage.bind(this);
  }

  turnPage(index) {
    this.setState({
      page: index
    });
  }

  componentDidMount() {
    /*装载完成阶段调用ajax渲染table明细*/
    fetch("./table.json", {credentials: 'include'}).then(function (response) {
      return response.json();
    }).then(function (data) {
      if (data.result.code === 0) {
        this.setState(data.result)
      } else {
        alert("data.result.message");
      }
    }).catch(function (e) {
      console.log("Oops, error");
    });
  }

  render() {
    return (
      <div id="page1_bottom">
        <div className="log-con-bd">
          <div className="tit">
            <div className="visit_time date-box clearfix">
              <input id="visit_time" className="time_l fl" placeholder="拜访时间"/>
              <label htmlFor="visit_time" className="time_r fl"><em className="icon-date"></em></label>
            </div>
            <select id="call_status">
              <option value="">呼叫状态</option>
              <option value="2">呼叫成功</option>
              <option value="3">呼叫失败</option>
              <option value="1">未呼叫</option>
            </select> <select id="follow_status">
            <option value="">跟进结果</option>
            <option value="1">持续跟进</option>
            <option value="2">已转销售</option>
            <option value="3">待跟进</option>
          </select> <select id="customer_intention">
            <option value="">客户意向</option>
            <option value="2">A+有意向</option>
            <option value="3">A可以考虑</option>
            <option value="5">B暂无意向</option>
            <option value="6">C不考虑</option>
            <option value="0">未填写</option>
          </select>
            <div className="a_search"><a href="###">搜索</a></div>
            <figure className="opt-a pa">
              <a href="###" id="firstHandle">优先处理
                <span className="firstH_box">
                <span data-type="1">已选项</span>
                <span data-type="3">当前页</span>
                <span data-type="2">搜索结果</span>
              </span>
              </a>
              <a href="###" id="setTarget">设置目标</a>
            </figure>
            <input id="keyword" type="text" placeholder="请输入公司名、门店名、经纪人姓名、经纪人手机号"/></div>
          <div className="log-table log-table-sales">
            {!this.state.data || !this.state.data.list.length ?
              <div className="side-null"></div>
              : (!this.props.level?
              <div>
              <table cellpadding="0" cellspacing="0" style={{width:100+"%"}} data-total="<%=data.total%>">
              <tr>
                (this.props.xkTel.jobid===this.props.xkTel.login_jobid?<th width="3%"><i class="btn-check"></i></th>:null)
                <th width="3%">序号</th>
                <th width="6%">客户</th>
                <th width="10%">归属</th>
                <th width="8%">责任销售</th>
                <th width="8%">拜访时间</th>
                <th width="8%">通话时长</th>
                <th width="8%">客户意向</th>
                <th >沟通详情</th>
                <th width="6%">跟进结果</th>
                <th width="6%">呼叫状态</th>
                <th width="6%">呼叫类型</th>
                <th width="10%">电销姓名</th>
              </tr>
              for(let i=0;i< this.state.data.list.length;i++){
              var list = data.list[i]
              <tr>
              <%if(window.xkTel.jobid==window.xkTel.login_jobid){%>
              <td><%if(list.queueinfo.is_call=="1"){%><i data-uid="<%=list.basicinfo.uid%>" class="btn-check"></i><%}%></td>
              <%}%>
              <td><%=list.prekey%></td>

              <%if(window.$_GET['groupid']){%>
              <td><a target='_blank'
              href="/saletel/record?citycode=<%=window.xkTel.citycode%>&uid=<%=list.basicinfo.uid%>&groupid=<%=window.$_GET['groupid']%>"><%=list.basicinfo.name%></a>
              </td><!--客户-->
              <%}else{%>
              <td><a target='_blank'
              href="/saletel/record?citycode=<%=window.xkTel.citycode%>&uid=<%=list.basicinfo.uid%>&jobid=<%=window.$_GET['jobid']%>"><%=list.basicinfo.name%></a>
              </td><!--客户-->
              <%}%>

              <td><%=list.basicinfo.companyshortname%> <%=list.basicinfo.storename%></td><!--公司归属-->

              <%if(list.saleinfo.major){%>
              <td><%=list.saleinfo.major.name%></td><!--责任销售-->
              <%}else{%>
              <td><%=list.saleinfo.server_line && list.saleinfo.server_line.name%></td><!--服务销售-->
              <%}%>

              <td><%if(list.telvisitinfo.visit_time_view){%><%=list.telvisitinfo.visit_time_view%><%}%></td><!--拜访时间-->
              <td><%=list.telvisitinfo.holdingtime%></td><!--通话时长-->
              <td><%=list.telvisitinfo.buylevel_view%></td><!--客户意向-->
              <%var tel_content=[];%>
              <%if(list.telvisitinfo.visitway==3){%>
              <%list.telvisitinfo.tomeet_view && tel_content.push('销售是否面见：'+list.telvisitinfo.tomeet_view);
              list.telvisitinfo.isremembersale_view && tel_content.push('是否记得销售姓名：'+list.telvisitinfo.isremembersale_view);
              list.telvisitinfo.isknowtopshow_view && tel_content.push('是否知道认证房置顶展示：'+list.telvisitinfo.isknowtopshow_view);
              list.telvisitinfo.howlongtostore_view && tel_content.push('销售多久去一次门店：'+list.telvisitinfo.howlongtostore_view);
              list.telvisitinfo.howlongcommunicate_view && tel_content.push('沟通了多久：'+list.telvisitinfo.howlongcommunicate_view);
              list.telvisitinfo.satisfiedservice_view && tel_content.push('是否满意销售服务：'+list.telvisitinfo.satisfiedservice_view);
              list.telvisitinfo.remark && tel_content.push('备注说明：'+list.telvisitinfo.remark);%>
              <%}else{list.telvisitinfo.tag && tel_content.push(list.telvisitinfo.tag);list.telvisitinfo.remark && tel_content.push(list.telvisitinfo.remark.replace(/.{30}/ig,"$&"+"\n"));}%>
              <td title="<%=tel_content.join('\r')%>" style="cursor: help;">
              <%var tel_content_join=tel_content.join('');%>
              <%if(tel_content_join.length>10){%>
              <%=tel_content_join.substring(0,10)+"..."%>
              <%}else{%>
              <%=tel_content_join%>
              <%}%>
              </td><!--沟通详情-->
              <td><%=list.queueinfo.follow_status_view%></td><!--跟进结果-->
              <td><%=list.queueinfo.call_status_view%></td><!--呼叫状态-->
              <td><%=list.telvisitinfo.calltype_view%></td><!--呼叫类型-->
              <td><%if(list.telvisitinfo.visitway==3 && list.telsaleinfo){%><%=list.telsaleinfo.group_name%>-<%=list.telsaleinfo.name%><%}%></td><!--电销姓名-->
              </tr>
              <%}%>
            </table>
              <p class="callnum">共找到经纪人<span><%=data.total%></span>位</p></div>:null)
            }
          </div>
          <div className="main-foot">
            <FootPage total={110} num={10} active={this.state.page} turnPage={this.turnPage}/>
          </div>
        </div>
      </div>
    )
  }
}
class TableTr extends
export default Page1Bottom;