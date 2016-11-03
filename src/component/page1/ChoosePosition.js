/**
 * Created by zz on 2016/10/28.
 */
import React,{Component} from 'react';
import ChoosePositionHover from './ChoosePositionHover';

export default class ChoosePosition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBlock: null
    }
  }

  render() {
    const blockArr = [];
    for (const i in this.props.block) {
      if ({}.hasOwnProperty.call(this.props.block, i)) {
        blockArr.push(this.props.block[i])
      }
    }

    return (
      <div className="item">
        <div className="position clearfix">
          <h2 className="fl">城区板块：</h2>
          <a href="javascript:void(0);" data-type="district" className="onend">全部</a>
          {blockArr.map(block=>
            <a href="javascript:void(0);" data-type="district" data-json={JSON.stringify(block.block)} data-id={block.id} key={block.id}>{block.name}<i></i></a>)}
        </div>
        {this.state.currentBlock ?
          <div className="line-list">
            <ChoosePositionHover {...this.props.block[this.state.currentBlock]} />
          </div> : null
        }
      </div>
    )
  }
}
