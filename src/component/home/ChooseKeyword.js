/**
 * Created by zz on 2016/10/28.
 */
import React,{Component} from 'react';
export default class ChooseKeyword extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="item">
        <div className="position clearfix">
          <h2 className="fl keyword">关键字：</h2>
          <div className="call_search fl">
            <input type="text" className="keyword-input" autoComplete="off" placeholder="输入公司名、门店名、客户姓名、客户手机号" />
            <i className="icon-look" />
            <div className="keyword_pop_box"></div>
          </div>
        </div>
      </div>
    )
  }
}