/**
 * Created by zz on 2016/10/28.
 */
import React, {Component} from 'react';

export default class ChoosePositionHover extends Component {
  render() {
    const {blocks, currentBlock}=this.props;
    let outArr = Object.keys(blocks).map(function (i) {
      let inArr = blocks[i].map(function (item) {
        return <a style={{cursor: "pointer"}} data-type="block" data-id={item.id} key={item.id}
                  className={item.id == currentBlock ? "onend" : null}>{item.name}</a>
      });
      return <span><span>{i}</span>{inArr}</span>
    });

    return (
      <div className="choose">
        {outArr}
      </div>
    )
  }
}