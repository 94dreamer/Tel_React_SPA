/**
 * Created by zz on 2016/8/19.
 */
import React, {Component} from 'react';
export default class StatItem extends Component {
  render() {
    const data=this.props.data;
    if(!data){
      // console.log("StatItem firstRender!");
      return null;
    }
    // console.log("StatItem render");
    let c1 = data.conversion_complete / data.conversion_target * 100 || 0;
    let c_1 = c1 > 100 ? 100 : c1;
    let c2 = data.connect_complete / data.connect_target * 100 || 0;
    let c_2 = c2 > 100 ? 100 : c2;
    let arr = [data.talksection_1, data.talksection_2, data.talksection_3, data.talksection_4];
    arr.sort(function (a, b) {
      return b - a;
    });
    let max = arr[0];
    return (
      <div className="stat_l">
        <div className="content">
          <div className="item-1">
            <div className=" circle1">
              <div className="pie_left">
                <div className="left"
                     style={c_1 > 50 ? {transform: "rotate(" + (c_1 * 3.6 - 180) + "deg)"} : null} />
              </div>
              <div className="pie_right">
                <div className="right" style={{transform: "rotate(" + (c_1 <= 50 ? c_1 * 3.6 : 180) + "deg)"}} />
              </div>
              <div className="mask"><span>{Math.round(c1 === Number.POSITIVE_INFINITY ? 100 : c1)}</span>%</div>
            </div>
            <ul>
              <li className="g-line">
                <span className="g-u">转化目标 </span>
                <q className="g-lastu"><em>{data.conversion_target}</em>人</q>
              </li>
              <li className="g-line">
                <span className="g-u">已 完 成  </span>
                <q className="g-lastu"><em className="c1">{data.conversion_complete}</em>人</q>
              </li>
            </ul>
          </div>
          <div className="item-2">
            <div className="circle2">
              <div className="pie_left">
                <div className="left"
                     style={c_2 > 50 ? {transform: "rotate(" + (c_2 * 3.6 - 180) + "deg)"} : null} />
              </div>
              <div className="pie_right">
                <div className="right" style={{transform: "rotate(" + (c_2 <= 50 ? c_2 * 3.6 : 180) + "deg)"}} />
              </div>
              <div className="mask"><span>{Math.round(c2 === Number.POSITIVE_INFINITY ? 100 : c2)}</span>%</div>
            </div>
            <ul>
              <li className="g-line">
                <span className="g-u">接通目标 </span>
                <q className="g-lastu"><em>{data.connect_target}</em>人</q>
              </li>
              <li className="g-line">
                <span className="g-u">已 完 成  </span>
                <q className="g-lastu"><em className="c1">{data.connect_complete}</em>人</q>
              </li>
            </ul>
          </div>
          <div className="item-3">
            <ul>
              <li className="g-line">
                <span className="tit g-u"><i className="c1"></i>最短通话时长 </span>
                <q className="result">{data.talktime_min}</q>
              </li>
              <li className="g-line">
                <span className="tit g-u"><i className="c2"></i>最长通话时长 </span>
                <q className="result">{data.talktime_max}</q>
              </li>
              <li className="g-line">
                <span className="tit g-u"><i className="c3"></i>平均通话时长 </span>
                <q className="result">{data.talktime_avg}</q>
              </li>
            </ul>
          </div>
          <div className="item-4">
            <ul>
              <li className="g-line g-line-1">
                <span className="tit g-u"><i></i>通话1分钟以下</span>
                <span className="schedule g-u"><em
                  style={{width: 100 * data.talksection_1 / max + "%"}} /></span>
                <q className="result g-lastu">{data.talksection_1}个</q>
              </li>
              <li className="g-line g-line-2">
                <span className="tit g-u"><i></i>通话1-3分钟</span>
                <span className="schedule g-u"><em
                  style={{width: 100 * data.talksection_2 / max + "%"}} /></span>
                <q className="result g-lastu">{data.talksection_2}个</q>
              </li>
              <li className="g-line g-line-3">
                <span className="tit g-u"><i></i>通话3-5分钟 </span>
                <span className="schedule g-u"><em
                  style={{width: 100 * data.talksection_3 / max + "%"}} /></span>
                <q className="result g-lastu">{data.talksection_3}个</q>
              </li>
              <li className="g-line g-line-4">
                <span className="tit g-u"><i></i>通话5分钟以上</span>
                <span className="schedule g-u"><em
                  style={{width: 100 * data.talksection_4 / max + "%"}} /></span>
                <q className="result g-lastu">{data.talksection_4}个</q>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
