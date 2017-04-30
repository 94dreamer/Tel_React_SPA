import React, {Component} from 'react';

export default class Record extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.setState({
      // 路由应该通过有用的信息来呈现，例如 URL 的参数
      // user: findUserById(this.props.params.userId)
      user: this.props.params.userId
    })
  }

  render() {
    return (
      <section class="r-c g-lastu">
        <header class="log-tel-hd clearfix">
          <h3><em class="ico-n"></em>已呼出明细</h3>
        </header>
      </section>
    )
  }
}
