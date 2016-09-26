/**
 * Created by zz on 2016/8/19.
 */
import React,{Component} from 'react';
import FootPage from '../component/FootPage';

class Page1Bottom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
    this.turnPage = this.turnPage.bind(this);
    this.callout = this.callout.bind(this);
    this.ajaxTable = this.ajaxTable.bind(this);
  }

  turnPage(index) {
    this.ajaxTable(index);
  }

  callout(tel, uid, uptime) {

  }

  ajaxTable(page) {
    this.ajaxRequest = $.ajax({
      url: '/saleajax/tellist/',
      data: {
        citycode: window.xkTel.citycode,//城市编号
        group_id: window.xkTel.group_id,//部组id
        jobid: window.xkTel.jobid,//销售工号
        parent_id: window.xkTel.parent_id
      },
      success: function (res) {
        var res = (typeof res=='string')?JSON.parse(res):res;
        if (res.result.code == 0) {
          this.setState(res.result)
        } else {
          alert(res.result.message);
        }
      }.bind(this)
    })
  }

  componentDidMount() {
    /*装载完成阶段调用ajax渲染table明细*/
    //一、此处为什么放弃fetch？原因有几个
    //1.fetch的兼容性较差
    //2.fetch暂时不支持中断，没有相关API。
    // 因为这个原因所以没有办法在react的es6语法环境中，在不使用isMounted()的情况下使用类似ajax的abort()方法在组件卸载的生命周期内停止异步操作，防止报错。
    /*fetch("./table.json", {credentials: 'include'}).then(function (response) {
     return response.json();
     }).then(function (data) {
     if (data.result.code === 0) {
     this.setState(data.result)
     } else {
     alert("data.result.message");
     }
     }).catch(function (e) {
     console.log("Oops, error");
     });*/
    //二、ajax的坑
    // 1.ajax的success函数内使用this.setState()，调用的是XHR对象，所以需要在ajax外层that=this，保存一下this的指向于组件。
    //或者是bind(this)。
    // 2.ajax如果是异步的 后面的如果调用到ajax内的数据取不到，解决方案是要么改成ajaxType改成同步，要么注意数据为空问题。
    this.ajaxTable()
  }

  componentWillUnmount() {//组件移除前停止异步操作。
    this.ajaxRequest.abort();
  }

  render() {
    const trArr = [];
    if (this.state.data && this.state.data.list && this.state.data.list.length) {
      for (let i = 0; i < this.state.data.list.length; i++) {
        trArr.push(<TableTr callout={this.callout} key={i} level={this.props.level} {...this.state.data.list[i]} />);
      }
    }
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
            <div className="a_search"><a style={{cursor:"pointer"}}>搜索</a></div>
            <figure className="opt-a pa">
              <a style={{cursor:"pointer"}} id="firstHandle">优先处理
                <span className="firstH_box">
                <span data-type="1">已选项</span>
                <span data-type="3">当前页</span>
                <span data-type="2">搜索结果</span>
              </span>
              </a>
              <a style={{cursor:"pointer"}} id="setTarget">设置目标</a>
            </figure>
            <input id="keyword" type="text" placeholder="请输入公司名、门店名、经纪人姓名、经纪人手机号"/></div>
          <div className="log-table log-table-sales">
            {(!this.state.data || !this.state.data.list || !this.state.data.list.length) ?
              <div className="side-null"></div>
              : (!this.props.level ?
              <div>
                <table cellPadding="0" cellSpacing="0" style={{width:100+"%"}} data-total="<%=data.total%>">
                  <tbody>
                  <tr>
                    (this.props.xkTel.jobid===this.props.xkTel.login_jobid?
                    <th width="3%"><i className="btn-check"></i></th>
                    :null)
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
                  {trArr}
                  </tbody>
                </table>
                <p className="callnum">共找到经纪人<span>{this.state.data.total}</span>位</p>
              </div> :
              <div>
                <table cellPadding="0" cellSpacing="0" style={{width:100+"%"}}>
                  <tbody>
                  <tr>
                    <th width="3%">序号</th>
                    <th width="6%">客户</th>
                    <th width="10%">归属</th>
                    <th width="6%">责任销售</th>
                    <th width="6%">拜访时间</th>
                    <th width="6%">通话时长</th>
                    <th width="6%">客户意向</th>
                    <th>沟通详情</th>
                    <th width="6%">跟进结果</th>
                    <th width="6%">呼叫状态</th>
                    <th width="6%">呼叫类型</th>
                    <th width="10%">电销姓名</th>
                    <th width="4%">操作</th>
                  </tr>
                  {trArr}
                  </tbody>
                </table>
                <p className="callnum">
                  已呼叫经纪人<span>{this.state.data.total}</span>位，呼叫次数<span>{this.state.data.callnum}</span>次</p>
              </div>)
            }
          </div>
          <div className="main-foot">
            <FootPage total={this.state.data.total*1} num={this.state.data.pagesize*1} active={this.state.data.currpage*1} turnPage={this.turnPage}/>
          </div>
        </div>
      </div>
    )
  }
}
class TableTr extends Component {
  constructor(props) {
    super(props)
    this.state = {
      check: false
    }
    this.checkHandle = this.checkHandle.bind(this);
  }

  checkHandle() {
    this.setState({
      check: !this.state.check
    })
  }

  callout() {
    this.props.callout(this.props.basicinfo.mobile, this.props.basicinfo.uid, this.props.queueinfo.visit_time)
  }

  render() {
    var tel_content = [];
    if (this.props.telvisitinfo.visitway == 3) {
      this.props.telvisitinfo.tomeet_view && tel_content.push('销售是否面见：' + this.props.telvisitinfo.tomeet_view);
      this.props.telvisitinfo.isremembersale_view && tel_content.push('是否记得销售姓名：' + this.props.telvisitinfo.isremembersale_view);
      this.props.telvisitinfo.isknowtopshow_view && tel_content.push('是否知道认证房置顶展示：' + this.props.telvisitinfo.isknowtopshow_view);
      this.props.telvisitinfo.howlongtostore_view && tel_content.push('销售多久去一次门店：' + this.props.telvisitinfo.howlongtostore_view);
      this.props.telvisitinfo.howlongcommunicate_view && tel_content.push('沟通了多久：' + this.props.telvisitinfo.howlongcommunicate_view);
      this.props.telvisitinfo.satisfiedservice_view && tel_content.push('是否满意销售服务：' + this.props.telvisitinfo.satisfiedservice_view);
      this.props.telvisitinfo.remark && tel_content.push('备注说明：' + this.props.telvisitinfo.remark);
    } else {
      this.props.telvisitinfo.tag && tel_content.push(this.props.telvisitinfo.tag);
      this.props.telvisitinfo.remark && tel_content.push(this.props.telvisitinfo.remark.replace(/.{30}/ig, "$&" + "\n"))
    }
    var tel_content_join = tel_content.join('');
    return (
      !this.props.level ?
        <tr>
          {this.props.xkTel.jobid === this.props.xkTel.login_jobid ?
            <td>
              (this.props.queueinfo.is_call==="1"?<i onClick={this.checkHandle} data-uid={this.props.basicinfo.uid} className={this.state.check?"btn-checked":"btn-check"}></i>:null)
            </td>
            : null}
          <td>{this.props.prekey}</td>
          <td>
            <a target='_blank' href={"/saletel/record?citycode="+window.xkTel.citycode+"&uid="+this.props.basicinfo.uid+(window.$_GET['groupid']?"&groupid="+window.$_GET["groupid"]:"&jobid="+window.$_GET["jobid"])}>{this.props.basicinfo.name}</a>
          </td>
          <td>{this.props.basicinfo.companyshortname} {this.props.basicinfo.storename}</td>
          <td>{this.props.saleinfo.major ? this.props.saleinfo.major.name : (this.props.saleinfo.server_line ? this.props.saleinfo.server_line.name : null)}</td>

          <td>{this.props.telvisitinfo.visit_time_view ? this.props.telvisitinfo.visit_time_view : null}</td>
          <td>{this.props.telvisitinfo.holdingtime}</td>
          <td>{this.props.telvisitinfo.buylevel_view}</td>
          <td title={tel_content.join('\r')} style={{cursor: "help"}}>
            {tel_content_join.length > 10 ? tel_content_join.substring(0, 10) + "..." : tel_content_join}
          </td>
          <td>{this.props.queueinfo.follow_status_view}</td>
          <td>{this.props.queueinfo.call_status_view}</td>
          <td>{this.props.telvisitinfo.calltype_view}</td>
          <td>{(this.props.telvisitinfo.visitway === 3 && this.props.telsaleinfo) ? this.props.telsaleinfo.group_name + "-" + this.props.telsaleinfo.name : null}</td>
        </tr> :
        <tr>
          <td>{this.props.prekey}</td>
          <td>
            <a target='_blank' href={"/saletel/record?citycode="+window.xkTel.citycode+"&uid="+this.props.basicinfo.uid+(window.$_GET['groupid']?"&groupid="+window.$_GET["groupid"]:"&jobid="+window.$_GET["jobid"])}>{this.props.basicinfo.name}</a>
          </td>
          <td>{this.props.basicinfo.companyshortname} {this.props.basicinfo.storename}</td>
          <td>{this.props.saleinfo.major ? this.props.saleinfo.major.name : (this.props.saleinfo.server_line ? this.props.saleinfo.server_line.name : null)}</td>

          <td>{this.props.telvisitinfo.visit_time_view ? this.props.telvisitinfo.visit_time_view : null}</td>
          <td>{this.props.telvisitinfo.holdingtime}</td>
          <td>{this.props.telvisitinfo.buylevel_view}</td>
          <td title={tel_content.join('\r')} style={{cursor: "help"}}>
            {tel_content_join.length > 10 ? tel_content_join.substring(0, 10) + "..." : tel_content_join}
          </td>
          <td>{this.props.queueinfo.follow_status_view}</td>
          <td>{this.props.queueinfo.call_status_view}</td>
          <td>{this.props.telvisitinfo.calltype_view}</td>
          <td>{(this.props.telvisitinfo.visitway === 3 && this.props.telsaleinfo) ? this.props.telsaleinfo.group_name + "-" + this.props.telsaleinfo.name : null}</td>
          <td>
            <a onClick={this.callout} style={{cursor:"pointer"}}>呼叫</a>
          </td>
        </tr>)
  }
}
export default Page1Bottom;