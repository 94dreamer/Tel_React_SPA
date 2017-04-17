/**
 * Created by zz on 2016/12/5.
 */
import React,{Component} from 'react';
import {Provider} from 'react-redux';
import App from '../routes/App';
import DevTools from './DevTools';

export  default class Root extends Component {
  render() {
    const {store} =this.props;
    return (
      <Provider store={store}>
        <div>
          <App />
          <DevTools />
        </div>
      </Provider>
    )
  }
}