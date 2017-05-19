/**
 * Created by zz on 2016/8/19.
 */
import React, {Component, PropTypes} from 'react';
import StatItem from './StatItem';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import {connect} from 'react-redux';
import actions from '../../actions';

class Page1Top extends Component {
  static propTypes = {
    resultDate: PropTypes.string,
  };

  componentDidMount() {
    if (!this.props.telstatresult) {
      this.props.changeDate(this.props.resultDate || moment(new Date()).format('YYYY/MM/DD'))
    }
  }


  render() {
    // 通过调用 connect() 注入:
    const {resultDate, telstatresult, changeDate, dispatch} = this.props;
    const date = resultDate ? moment(new Date(resultDate)) : moment(new Date());
    return (
      <div id="page1_top">
        <div className="log-stat-hd">
          <div className="g-line">
            <div className="date-box clearfix g-u">
              <DatePicker id="result_date" className="time_l fl"
                          dateFormat="YYYY/MM/DD"
                          selected={date}
                          dateFormatCalendar="MMMM"
                          locale="zh-cn"
                          onChange={(e) => {
                            changeDate(e.format('YYYY/MM/DD'))
                          }}
              />
              <label htmlFor="result_date" className="time_r fr"><em className="icon-date"/></label>
            </div>
            <p className="g-lastu">按时间查看统计结果</p>
          </div>
          <div className="stat-item clearfix">
            <StatItem data={telstatresult}/>
          </div>
        </div>
      </div>
    )
  }
}

function select(state) {
  return {
    resultDate: state.resultDate,
    telstatresult: state.telstatresult,
  };
}

// const mapDispatchToProps = {
//  changeDate: actions.CHANGE_resultDate,
// };

function mapDispatchToProps(dispatch) {
  return {
    changeDate: (e) => dispatch(actions.CHANGE_resultDate(e)),
  }
}

export default connect(select, mapDispatchToProps)(Page1Top);
