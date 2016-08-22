/**
 * Created by zz on 2016/8/19.
 */
import React,{Component} from 'react';
import StatItem from '../component/StatItem';

class Page1Top extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mindate: new Date(),
      maxdate: new Date()
    }
    this.dateForm = this.dateForm.bind(this);
  }

  dateForm(nT) {
    var dateH = nT.getFullYear() + "/" + (nT.getMonth() + 1 < 10 ? '0' + (nT.getMonth() + 1) : nT.getMonth() + 1) + "/" + (nT.getDate() < 10 ? '0' + nT.getDate() : nT.getDate());
    return dateH;
  }

  render() {
    console.log(this.props.isCallCenter);
    var minDate = this.dateForm(this.state.mindate);
    var maxDate = this.dateForm(this.state.maxdate);
    return (
      <div id="page1_top">
        <div className="log-stat-hd">
          <div className="g-line">
            <div className="date-box clearfix g-u">
              <input id="result_date" className="time_l fl" defaultValue={minDate+"到"+maxDate}/>
              <label htmlFor="result_date" className="time_r fl"><em className="icon-date"></em></label>
            </div>
            <p className="g-lastu">按时间查看统计结果</p>
          </div>
          <div className="stat-item clearfix">
            <StatItem />
            {this.props.level &&
            (<div className="stat_start" style={this.props.isCallCenter && {paddingTop:40}}>
              <div id="stratWork">{this.props.isCallCenter ? "正在登录" : "开始工作"}</div>
              {this.props.isCallCenter && <div id="quitWork">置忙</div>}
              <span></span>
              <select id="work_type">
                <option value="1">首次呼叫</option>
                <option value="3">电销回访</option>
                <option value="4">已售维护</option>
              </select>
            </div>)}
          </div>
        </div>
        {this.props.level ?
          <header className="log-tel-hd clearfix">
            <h3><em className="ico-n"></em>已呼出明细</h3>
          </header>
          :
          <div className="h15"></div>
        }
      </div>
    )
  }
}
export default Page1Top;