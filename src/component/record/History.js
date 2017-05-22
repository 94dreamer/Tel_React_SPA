/**
 * Created by zhouzhen on 2017/4/30.
 */
import React, {Component, PropTypes} from 'react';
export  default class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 2
    }
  }

  componentDidMount() {
    this.props.visitListAjax({...this.props.params, type: this.state.type});
  }

  handleClick = (type) => {
    this.setState({type: type});
  };

  render() {
    const {tel_total, total, list, tel_list} = this.props.visitlist || {};
    return (
      <div className="record_newCon">
        <div className="record_4">
          <h2><em />拜访历史</h2>
          <div className="con">
            <ul className="main-title">
              <li className={this.state.type == 2 ? "current" : null} onClick={() => this.handleClick(2)}><a>
                电销呼叫历史（{tel_total}）</a></li>
              <li className={this.state.type == 1 ? "current" : null} onClick={() => this.handleClick(1)}><a>
                销售拜访历史（{total}）</a></li>
            </ul>
            {!(list && list.length) && !(tel_list && tel_list.length) ?
              <div className="side-null"/>
              :
              <div className="log-table log-table-tel detail-table">
                <table cellPadding="0" cellSpacing="0" width="100%">
                  {list.length && (<tr>
                    <th width="10%">拜访时间</th>
                    <th width="10%">销售</th>
                    <th width="10%">客户意向</th>
                    <th width="10%">是否已面见</th>
                    <th width="10%">拜访类型</th>
                    <th width="10%">拜访方式</th>
                    <th width="40%" className="bor_r0">沟通详情</th>
                  </tr>)}
                  {list.map($item => {
                    return (
                      <tr data-id="{{$item.id}}">
                        <td>{$item.visittime}</td>
                        <td>{'hq' == window.ROLE.citycode ? window.gArr.citycn : '-'}{$item.sale}</td>
                        <td>{$item.intention}</td>
                        <td>{$item.hasbeenmet}</td>
                        <td>{$item.visittype}</td>
                        <td>{$item.visitway}</td>
                        <td className="bor_r0" title={$item.talk_content}>{$item.talk_content_short}</td>
                      </tr>
                    )
                  })}
                  {tel_list.length && (
                    <tr>
                      <th width="15%">电话沟通时间</th>
                      <th width="15%">电销</th>
                      <th width="15%">销售</th>
                      <th width="8%">客户意向</th>
                      <th width="40%">沟通详情</th>
                      <th width="7%" className="bor_r0">通话时长</th>
                    </tr>
                  )}
                  {tel_list.map($item => {
                    return (<tr data-id={$item.id}>
                      <td>{$item.visittime}</td>
                      <td>{$item.sale}</td>
                      <td>{'hq' == window.ROLE.citycode ? window.gArr.citycn : '-'}{$item.saleinfo_name}</td>
                      <td>{$item.intention}</td>
                      <td title={$item.talk_content}>{$item.talk_content_short}</td>
                      <td className="bor_r0">{$item.teltime ? $item.teltime : '--'}</td>
                    </tr>)
                  })}
                </table>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}