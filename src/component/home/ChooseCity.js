/**
 * Created by zz on 2016/10/28.
 */

import React, {Component} from 'react';

export default class ChooseCity extends Component {
  render() {
    const {citycode, citys} =this.props;
    return (
      <div class="item choose_city">
        <div class="position clearfix" style={{display: "block"}}>
          <h2 class="fl">所属城市：</h2>
          <a href="javascript:;" data-type="citycode" data-id="hq" class={citycode == 'hq' ? 'onend' : ''}>全部</a>
          {citys.map((item) => <a href="javascript:;" class={citycode == item.citycode ? 'onend' : ''}
                                  data-type="citycode"
                                  data-id={item.citycode}>{item.cityname}</a>)}
        </div>
      </div>
    )
  }
}
