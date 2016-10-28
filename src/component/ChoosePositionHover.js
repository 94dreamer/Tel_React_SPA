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
    var arr = []
    for (var i in data) {
      arr.push(data[i])
    }
    var outArr=arr.map(function(outItem,outI){
      var inArr=[];
      inArr=outItem.map(function(inItem){
        inArr.push(<a href="javascript:void(0);" data-type="block" data-id={inItem.id}>{inItem.name}</a>)
      })
      return <span>{outI}</span>{inArr}
    });
    return (
      <div className="choose">
        {outArr}
      </div>
    )
  }
}