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
    fetch("./table.json").then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);
      if(data.result.code===0){
        this.setState(data.result)
      }else{
        alert("请求数据失败")
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
              :
              <div>
                <table style={{cellpadding:0,cellspacing:0,width:100+'%'}} data-total="3289">
                  <tbody>
                  <tr>
                    <th width="3%"><i className="btn-check"></i></th>
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
                  </tr>
                  <tr>
                    <td><i data-uid="8337841" className="btn-check"></i></td>
                    <td>1</td>
                    <td><a target="'_blank'" href="/saletel/record?citycode=bj&amp;uid=8337841&amp;groupid=333">蔡亚运</a>
                    </td>
                    <td>麦田房产 合生创展店</td>
                    <td>郭琳琳</td>
                    <td>2016/08/22 12:24:05</td>
                    <td></td>
                    <td>B暂无意向</td>
                    <td title="客户培训" style={{cursor:"help"}}> 客户培训</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  </tbody>
                </table>
                <p className="callnum">共找到经纪人<span>{this.state.total}</span>位</p>
              </div>
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
export default Page1Bottom;