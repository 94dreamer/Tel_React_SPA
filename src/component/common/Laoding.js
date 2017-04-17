/**
 * Created by zhouzhen on 2017/4/17.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

class Laoding extends Component {
  render() {
    const {loadNum}=this.props;
    if(loadNum<=0){
      return null;
    }
    return (
      <div className="loader_w">
        <div className="loader"><p className="in"></p></div>
        <div className="loader-lyt"></div>
      </div>
    )
  }
}

function select(state) {
  return {
    loadNum:state.loadNum,
  }
}
export default connect(select)(Laoding);



