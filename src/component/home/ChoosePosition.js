/**
 * Created by zz on 2016/10/28.
 */

import React, {Component,PropTypes} from 'react';
import ChoosePositionHover from './ChoosePositionHover';

export default class ChoosePosition extends Component {
  static propTypes={
    blocks:PropTypes.object.isRequired,
  };

  render() {
    const {currentDistrict, currentBlock, blocks}=this.props;
    var currentIndex;
    let districtArr = Object.keys(blocks).map((i) => {
      var classname = '';
      if (blocks[i].id == currentDistrict) {
        classname = 'onend';
        currentIndex = i;
      }
      return (<a href="javascript:;" data-type="district" className={classname} data-id={blocks[i].id}
                 key={blocks[i].id}>{blocks[i].name}<i /></a>)
    });

    return (
      <div className="item">
        <div className="position clearfix">
          <h2 className="fl">城区板块：</h2>
          <a href="javascript:;" data-type="district" className={!currentDistrict ? "onend" : null}>全部</a>
          {districtArr}
        </div>
        {currentDistrict &&
          <div className="line-list">
            <ChoosePositionHover blocks={blocks[currentIndex].block} currentBlock={currentBlock}/>
          </div>
        }
      </div>
    )
  }
}
