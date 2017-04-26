/**
 * Created by zz on 2016/10/28.
 */
import React, {Component, PropTypes} from 'react';

export default class ChooseGroupHover extends Component {
  static propTypes = {
    groups: PropTypes.array.isRequired,
    currentGroup: PropTypes.string,
  };

  render() {
    const {groups, currentGroup} = this.props;
    return (
      <div className="choose group_div">
        <a href="javascript:void(0);" data-type="group" className={!currentGroup ? "onend" : null}>全部</a>
        {
          groups.map((item) => <a href="javascript:void(0);" data-type="group" data-id={item.id}
                                  className={item.id == currentGroup ? "onend" : null}
                                  key={item.id}>{item.name}</a>)
        }
      </div>
    )
  }
}
