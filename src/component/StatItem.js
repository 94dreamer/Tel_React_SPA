/**
 * Created by zz on 2016/8/19.
 */
import React,{Component} from 'react';

class StatItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    var c1=conversion_complete/conversion_target*100||0;
    var c_1=c1>100?100:c1;
    var c2=connect_complete/connect_target*100||0;
    var c_2=c2>100?100:c2;
    var arr=[this.props.talksection_1,this.props.talksection_2,this.props.talksection_3,this.props.talksection_4];
    arr.sort(function(a,b){return b-a;});
    var max=arr[0];
    return (
      <div class="stat_l">
        <div class="content">
          <div class="item-1">
            <div class=" circle1">
              <div class="pie_left">
                <div class="left" style={c_1>50 && {transform:rotate({c_1*3.6-180}deg)}}></div>
              </div>
              <div class="pie_right">
                <div class="right" style={{transform:rotate({c_1<=50?c_1*3.6:180}deg)}}></div>
              </div>
              <div class="mask"><span>{Math.round(c1==Number.POSITIVE_INFINITY?100:c1)}</span>%</div>
            </div>
            <ul>
              <li class="g-line">
                <span class="g-u">转化目标 </span>
                <q class="g-lastu"><em>{this.props.conversion_target}</em>人</q>
              </li>
              <li class="g-line">
                <span class="g-u">已 完 成  </span>
                <q class="g-lastu"><em class="c1">{this.props.conversion_complete}</em>人</q>
              </li>
            </ul>
          </div>
          <div class="item-2">
            <div class="circle2">
              <div class="pie_left">
                <div class="left" style={c_2>50 && {transform:rotate({c_2*3.6-180}deg)}}></div>
              </div>
              <div class="pie_right">
                <div class="right" style={{transform:rotate({c_2<=50?c_2*3.6:180}deg)}}></div>
              </div>
              <div class="mask"><span>{Math.round(c2==Number.POSITIVE_INFINITY?100:c2)}</span>%</div>
            </div>
            <ul>
              <li class="g-line">
                <span class="g-u">接通目标 </span>
                <q class="g-lastu"><em>{this.props.connect_target}</em>人</q>
              </li>
              <li class="g-line">
                <span class="g-u">已 完 成  </span>
                <q class="g-lastu"><em class="c1">{this.props.connect_complete}</em>人</q>
              </li>
            </ul>
          </div>
          <div class="item-3">
            <ul>
              <li class="g-line">
                <span class="tit g-u"><i class="c1"></i>最短通话时长 </span>
                <q class="result">{this.props.talktime_min}</q>
              </li>
              <li class="g-line">
                <span class="tit g-u"><i class="c2"></i>最长通话时长 </span>
                <q class="result">{this.props.talktime_max}</q>
              </li>
              <li class="g-line">
                <span class="tit g-u"><i class="c3"></i>平均通话时长 </span>
                <q class="result">{this.props.talktime_avg}</q>
              </li>
            </ul>
          </div>
          <div class="item-4">
            <ul>
              <li class="g-line g-line-1">
                <span class="tit g-u"><i></i>通话1分钟以下</span>
                <span class="schedule g-u"><em style={{width:{100*this.props.talksection_1/max}%}}></em></span>
                <q class="result g-lastu">{this.props.talksection_1}个</q>
              </li>
              <li class="g-line g-line-2">
                <span class="tit g-u"><i></i>通话1-3分钟</span>
                <span class="schedule g-u"><em style={{width:{100*this.props.talksection_2/max}%}}></em></span>
                <q class="result g-lastu">{this.props.talksection_12}个</q>
              </li>
              <li class="g-line g-line-3">
                <span class="tit g-u"><i></i>通话3-5分钟 </span>
                <span class="schedule g-u"><em style={{width:{100*this.props.talksection_3/max}%}}></em></span>
                <q class="result g-lastu">{this.props.talksection_3}个</q>
              </li>
              <li class="g-line g-line-4">
                <span class="tit g-u"><i></i>通话5分钟以上</span>
                <span class="schedule g-u"><em style={{width:{100*this.props.talksection_4/max}%}}></em></span>
                <q class="result g-lastu">{this.props.talksection_4}个</q>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default StatItem;