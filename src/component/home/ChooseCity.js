/**
 * Created by zz on 2016/10/28.
 */

import React, {Component} from 'react';

export default class ChooseCity extends Component {
  render() {
    const {citycode, citys} =this.props;
    return (
      <div className="item choose_city">
        <div className="position clearfix" style={{display: "block"}}>
          <h2 className="fl">所属城市：</h2>
          <a href="javascript:;" data-type="citycode" data-id="hq" className={citycode == 'hq' ? 'onend' : ''}>全部</a>
          {citys.map((item) => <a href="javascript:;" className={citycode == item.citycode ? 'onend' : ''}
                                  data-type="citycode"
                                  data-id={item.citycode}>{item.cityname}</a>)}
        </div>
      </div>
    )
  }
}
