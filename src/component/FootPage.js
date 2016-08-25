/**
 * Created by zz on 2016/8/23.
 */
import React,{Component} from 'react';

class FootPage extends Component {
  constructor(props) {
    super(props)
    this.state =null;
    this.turnPage=this.turnPage.bind(this);
    this.prevPage=this.prevPage.bind(this);
    this.nextPage=this.nextPage.bind(this);
  }
  static propTypes={//属性校验器，否则报错
    active:React.PropTypes.number,
    total:React.PropTypes.number,
    num:React.PropTypes.number,
    turnPage:React.PropTypes.func
  }
  static defaultProps={
    num:20,
    active:1,
    len:5//props必须为大于或等于3的单数，不传默认是5。
  }

  turnPage(index){
    this.props.turnPage(index);
  }
  prevPage(){
    this.props.turnPage(this.props.active-1)
  }
  nextPage(){
    this.props.turnPage(this.props.active+1)
  }

  render() {
    const len=(this.props.len%2===1 && this.props.len>=3 && this.props.len) || 5;//props必须为大于或等于3的单数，不传或误传默认是5。
    const lenPage=(len-1)/2;
    const totalPage = Math.ceil(this.props.total / this.props.num);
    const curPage =this.props.active;
    const minPage =curPage>totalPage-lenPage?totalPage-len+1:(curPage<=lenPage?1:curPage-lenPage);
    const maxPage =curPage<=lenPage?len:(totalPage >curPage+lenPage ? curPage+lenPage : totalPage);
    const liArr = [];
    for (let i = minPage; i <= maxPage; i++) {
      liArr.push(<PageLi key={i} index={i} active={curPage} clickHandle={this.turnPage} />)
    }
    return (
      this.props.total ?
        <ul className="turn-page clearfix">
          {this.props.active>1?<li className="prev"><a style={{cursor:"pointer"}} onClick={this.prevPage}>上一页</a></li>:null}
          {liArr}
          {this.props.active<totalPage?<li className="next"><a style={{cursor:"pointer"}} onClick={this.nextPage}>下一页</a></li>:null}
          <li className="pl5 total">共<span>{totalPage}</span>页</li>
        </ul>
        : null
    )
  }
}

class PageLi extends Component {
  constructor(props) {
    super(props);
    this.state = null;
    this.clickHandle=this.clickHandle.bind(this);
  }
  clickHandle(){
    if(this.props.index!==this.props.active){
      this.props.clickHandle(this.props.index);
    }
  }
  render() {
    return (
      <li className="page">
        <a style={{cursor:"pointer"}} onClick={this.clickHandle} className={this.props.index===this.props.active?"active":null}>{this.props.index}</a>
      </li>)
  }
}

export default FootPage;