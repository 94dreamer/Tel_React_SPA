/**
 * Created by zz on 2016/8/19.
 */
import React,{Component} from 'react';
import Uncall_btn from './Uncall_btn'
import UncallChoose from './UncallChoose';
import CalledChoose from './CalledChoose';
import UncallTab from './UncallTab';
import CalledTab from './CalledTab';
import FootPage from './FootPage';

export default class Page1Middle extends Component {
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
        var res = (typeof res == 'string') ? JSON.parse(res) : res;
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
      <div id="page1_middle">

        <div className="Telemarketing_main">
          <ul className="main-title">
            <li className="current" data-type="uncall"><a href="javascript:void(0);"> 待呼叫（<span>{data.queuenum}></span>）</a>
            </li>
            <li data-type="called" data-time="0"><a href="javascript:void(0);">已呼叫（<span>{data.callnum}</span>）</a></li>
          </ul>
          <div className="tagBox">
            <div id="uncall-tag" className="tag_tab">
              <div className="tag_callCon">
                <Uncall_btn />
                <UncallChoose />
                <div className="h15"></div>
              </div>
              <div className="table_callCon">
                <div className="log-table log-table-sales">
                  <UncallTab />
                </div>
                <div className="main-foot">
                  <FootPage />
                </div>
              </div>
            </div>
            <div id="called-tag" className="tag_tab dn">
              <div className="tag_callCon">
                <div className="hd_btn">
                  <a href="javascript:void(0);" id="exportCalled" className="btn_gray">导出数据</a>
                </div>
                <CalledChoose />
                <div className="h15"></div>
              </div>
              <div className="table_callCon">
                <div className="log-table log-table-sales">
                  <CalledTab />
                </div>
                <div className="main-foot">
                  <FootPage />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
