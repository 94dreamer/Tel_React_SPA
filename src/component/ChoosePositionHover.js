/**
 * Created by zz on 2016/10/28.
 */
import React,{Component} from 'react';

export default class ChoosePositionHover extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const arr = [];
    for (let i in data) {
      arr.push(data[i])
    }

    let outArr = arr.map(function (outItem, outI) {
      let inArr = outItem.map(function (inItem) {
        return <a style={{cursor:"pointer"}} data-type="block" data-id={inItem.id}>{inItem.name}</a>
      })
      return <span><span>{outI}</span>{inArr}</span>
    })

    return (
      <div className="choose">
        {outArr}
      </div>
    )

  }
}