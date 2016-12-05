/**
 * Created by zz on 2016/12/5.
 */
import React,{Component} from 'react';
import {Provider} from 'react-redux';
import App from './App';
export default class Root extends Component{
  render(){
    const {store} =this.props;
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}