/**
 * Created by zz on 2016/10/28.
 */

import React, {Component, PropTypes} from 'react';
import ChooseGroupHover from './ChooseGroupHover';

export default class ChooseGroup extends Component {
  static propTypes = {
    groups: PropTypes.object.isRequired,
  };

  render() {
    const {currentParent, currentGroup, groups} = this.props;
    var currentIndex;
    let parentArr = Object.keys(groups).map((i) => {
      var classname = '';
      if (groups[i].id == currentParent) {
        classname = 'onend';
        currentIndex = i;
      }
      return (<a href="javascript:;" data-type="parent" className={classname} data-id={groups[i].id}
                 key={groups[i].id}>{groups[i].name}<i /></a>)
    });

    return (
      <div className="item">
        <div className="position clearfix">
          <h2 className="fl">所属部组：</h2>
          <a href="javascript:void(0);" data-type="parent" className={!currentParent ? "onend" : null}>全部</a>
          {parentArr}
        </div>
        {currentGroup &&
        <div className="line-list">
          <ChooseGroupHover group={groups[currentIndex].group} currentGroup={currentGroup}/>
        </div>
        }
      </div>
    )
  }
}
