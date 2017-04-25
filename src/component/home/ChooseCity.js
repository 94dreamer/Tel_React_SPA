/**
 * Created by zz on 2016/10/28.
 */

import React, {Component} from 'react';

export default class ChooseCity extends Component {
  render() {
    const {citycode,citys} =this.props;
    return (
      <div class="item choose_city">
        <div class="position clearfix" style={{display: "block"}}>
          <h2 class="fl">所属城市：</h2>
          <a href="javascript:;" data-type="citycode" data-id="hq" class={citycode == 'hq'?'onend':''}>全部</a>
          {Object.keys(citys).map((currentCity) => <a href="javascript:;"
                                                     class={citycode == currentCity.citycode ? 'onend' : ''}
                                                     data-type="citycode"
                                                     data-id={currentCity.citycode}>{currentCity.cityname}</a>)}
        </div>
      </div>
    )
  }
}
