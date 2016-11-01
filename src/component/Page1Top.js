/**
 * Created by zz on 2016/8/19.
 */
import React,{Component} from 'react';
import StatItem from '../component/StatItem';

export default class Page1Top extends Component {
  constructor(props) {
    super(props);
    this.dateForm = this.dateForm.bind(this);
    this.dateChange = this.dateChange.bind(this);
    this.state = {
      mindate: this.dateForm(new Date()),
      maxdate: this.dateForm(new Date())
    }
  }

  dateForm(nT) {
    var dateH = nT.getFullYear() + "/" + (nT.getMonth() + 1 < 10 ? '0' + (nT.getMonth() + 1) : nT.getMonth() + 1) + "/" + (nT.getDate() < 10 ? '0' + nT.getDate() : nT.getDate());
    return dateH;
  }

  dateChange(e) {
    this.setState({
      mindate: e.target.value.split("到")[0],
      maxdate: e.target.value.split("到")[1]
    })
  }

  render() {
    const date = {
      minDate: this.state.mindate,
      maxDate: this.state.maxdate
    }
    return (
      <div id="page1_top">
        <div className="log-stat-hd">
          <div className="g-line">
            <div className="date-box clearfix g-u">
              <input id="result_date" className="time_l fl" defaultValue={this.state.mindate+"到"+this.state.maxdate} onChange={this.dateChange}/>
              <label htmlFor="result_date" className="time_r fl"><em className="icon-date"></em></label>
            </div>
            <p className="g-lastu">按时间查看统计结果</p>
          </div>
          <div className="stat-item clearfix">
            <StatItem {...date} />
          </div>
        </div>
      </div>
    )
  }
}