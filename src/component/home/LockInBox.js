/**
 * Created by zz on 2016/8/19.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';

class LockInBox extends Component {
  render() {
    console.log("UncallBox render");
    const {dispatch} = this.props;
    return (
      <div id="lockIn-tag" className="tag_tab animated fadeOut">

        <div className="table_callCon">
          <div className="log-table log-table-sales">
            <!--("lockIn_tab_temp",{data:data})-->
            <LockInTab data={calledRes} />
          </div>
          <!-- 分页 -->
          <div className="main-foot">
            <FootPage turnPage={this.turnPage}/>
          </div>
        </div>
      </div>
    )
  }
}

function select(state) {
  return {
    uncallData: state.uncallData
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(select, mapDispatchToProps)(LockInBox);
