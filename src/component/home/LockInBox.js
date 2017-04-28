/**
 * Created by zz on 2016/8/19.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

class LockInBox extends Component {
  render() {
    console.log("UncallBox render");
    const {dispatch} =this.props;
    return (
      <div id="uncall-tag" className="tag_tab">

      </div>
    )
  }
}

function select(state) {
  return {
    uncallData: state.uncallData
  }
}
export default connect(select)(LockInBox);
