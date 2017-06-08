/**
 * Created by zhouzhen on 2017/6/8.
 */
import React, {Component} from 'react';

export default class Bundle extends Component {
  state = {
    mod: null,
  };

  componentWillMount() {
    this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  load(props) {
    this.setState({
      mod: null,
    })

    props.load((mod) => {
      this.setState({
        mod: mod.default ? mod.default : mod
      })
    });

  }

  render() {
    return this.props.children(this.state.mod)
  }
}