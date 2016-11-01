/**
 * Created by zz on 2016/8/19.
 */
import React,{Component} from 'react';
import StatItem from '../component/StatItem';
import {connect} from 'react-redux'

class Page1Top extends Component {
  constructor(props) {
    super(props);
    this.dateForm = this.dateForm.bind(this);
    this.dateChange = this.dateChange.bind(this);
  }

  dateForm(nT) {
    var dateH = nT.getFullYear() + "/" + (nT.getMonth() + 1 < 10 ? '0' + (nT.getMonth() + 1) : nT.getMonth() + 1) + "/" + (nT.getDate() < 10 ? '0' + nT.getDate() : nT.getDate());
    return dateH;
  }

  dateChange(e) {
    this.props.dispatch({
      type: "CHANGE_resultDate",
      min: e.target.value.split("到")[0],
      max: e.target.value.split("到")[1]
    })
  }

  render() {
    // 通过调用 connect() 注入:
    const {dispatch, resultDate} = this.props;
    const date = {
      min: this.props.resultDate.min || this.dateForm(new Date()),
      max: this.props.resultDate.max || this.dateForm(new Date())
    }
    return (
      <div id="page1_top">
        <div className="log-stat-hd">
          <div className="g-line">
            <div className="date-box clearfix g-u">
              <input id="result_date" className="time_l fl" defaultValue={date.min+"到"+date.max} onChange={this.dateChange}/>
              <label htmlFor="result_date" className="time_r fl"><em className="icon-date"></em></label>
            </div>
            <p className="g-lastu">按时间查看统计结果</p>
          </div>
          <div className="stat-item clearfix">
            <StatItem {...this.props.resultDate} />
          </div>
        </div>
      </div>
    )
  }
}

function select(state) {
  return {
    resultDate: state.resultDate
  };
}
export default connect(select)(Page1Top);
