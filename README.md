# 项目文件配置

```
/build/		# 构建输出的文件会在这里

/node_modules/	# 第三方类库和工具

/src/		# 应用源码

     /components/	# React component
     
     /constants/	# 常量（比如 action types等）
     
     /containers/	# React containers
     
     /entries/ 	# 应用入口
     
     /reducers/ 	# reducers
     
     /routes/	# 路由信息
     
     /sagas/	# redux-sagas
     
     /services/	# 处理和服务器的交互
     
proxy.config.js	# 配置 dora-plugin-proxy,用于 mock 和在线调试

webpack.config.js	# 扩展 webpack 配置

package.json	# 配置入口文件、依赖和 scripts
```

# 基本写法
### `DangerButton.js`

```js
import React, { Component } from 'react';
import Button from './Button'; // Import a component from another file

class DangerButton extends Component {
  render() {
    return <Button color="red" />;
  }
}

export default DangerButton;
```


#### `Button.css`

```css
.Button {
  padding: 20px;
}
```

#### `Button.js`

```js
import React, { Component } from 'react';
import './Button.css'; // Tell Webpack that Button.js uses these styles

class Button extends Component {
  render() {
    // You can use them as regular CSS styles
    return <div className="Button" />;
  }
}
```


For example, this:

```css
.App {
  display: flex;
  flex-direction: row;
  align-items: center;
}
```

becomes this:

```css
.App {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}
```

Here is an example:

```js
import React from 'react';
import logo from './logo.png'; // Tell Webpack this JS file uses this image

console.log(logo); // /logo.84287d09.png

function Header() {
  // Import result is the URL of your image
  return <img src={logo} alt="Logo" />;
}

export default function Header;
```

This works in CSS too:

```css
.Logo {
  background-image: url(./logo.png);
}
```

# React开发过程中的一些坑和深刻的debugger。

## 1.AJAX

//一、此处为什么放弃fetch？原因有几个

//1.fetch的兼容性较差

//2.fetch暂时不支持中断，没有相关API。

// 因为这个原因所以没有办法在react的es6语法环境中，在不使用isMounted()的情况下使用类似ajax的abort()方法在组件卸载的生命周期内停止异步操作，防止报错。

//二、$.ajax的坑

// 1.ajax的success函数内使用this.setState()，调用的是XHR对象，所以需要在ajax外层that=this，保存一下this的指向于组件。

//或者是bind(this)。

// 2.ajax如果是异步的 后面的如果调用到ajax内的数据取不到，解决方案是要么改成ajaxType改成同步，要么注意数据为空问题。


<ChoosePosition />
        <div className="item">
          <div className="position clearfix" style={{display: "block"}}>
            <h2 className="fl">呼叫列队：</h2>
            {callArr.map(item=><a href="javascript:void(0);" className="oned" key={item.key} data-type="callqueue" data-id={item.key}>{item.value}</a>)}
            <h2 className="fl dataCon">队列日期：</h2>
            <div className="visit_time date-box clearfix fl">
              <input className="time_l fl" id="queueDate" placeholder="选择日期"/>
              <label htmlFor="queueDate" className="time_r fl"><em className="icon-date"/></label>
            </div>
          </div>
        </div>
        <ChooseGroup />
        <ChooseKeyword />




	<ChoosePosition />
        <ChooseGroup />
        <div className="item">
          <div className="position clearfix" style={{display: "block"}}>
            <h2 className="fl">电销标签：</h2>
            <a href="javascript:void(0);" data-type="visitlabel" className="onend">全部</a>
            <a href="javascript:void(0);" data-type="visitlabel" data-id="1">已邀约</a>
            <a href="javascript:void(0);" data-type="visitlabel" data-id="5">邀约回访</a>
            <a href="javascript:void(0);" data-type="visitlabel" data-id="6">陌拜回访</a>
            <a href="javascript:void(0);" data-type="visitlabel" data-id="7">自我安排回访</a>
            <a href="javascript:void(0);" data-type="visitlabel" data-id="2">未达标提醒</a>
            <a href="javascript:void(0);" data-type="visitlabel" data-id="3">7天开通关怀</a>
            <a href="javascript:void(0);" data-type="visitlabel" data-id="4">7天下线提醒</a>
          </div>
        </div>
        <div className="item">
          <div className="position clearfix" style={{display: "block"}}>
            <h2 className="fl">呼叫状态：</h2>
            <a href="javascript:void(0);" data-type="call_status" className="onend">全部</a>
            <a href="javascript:void(0);" data-type="call_status" data-id="1">呼叫成功</a>
            <a href="javascript:void(0);" data-type="call_status" data-id="2">呼叫失败</a>
          </div>
        </div>
        <div className="item">
          <div className="position clearfix" style={{display: "block"}}>
            <h2 className="fl">客户意向：</h2>
            <a href="javascript:void(0);" data-type="buylevel" className="onend">全部</a>
            <a href="javascript:void(0);" data-type="buylevel" data-id="2">A+有意向</a>
            <a href="javascript:void(0);" data-type="buylevel" data-id="3">A可以考虑</a>
            <a href="javascript:void(0);" data-type="buylevel" data-id="5">B暂无意向</a>
            <a href="javascript:void(0);" data-type="buylevel" data-id="6">C不考虑</a>
            <a href="javascript:void(0);" data-type="buylevel" data-id="0">未填写</a>
          </div>
        </div>
        <div className="item">
          <div className="position clearfix" style={{display: "block"}}>
            <h2 className="fl">呼叫时间：</h2>
            <div className="visit_time date-box clearfix fl">
              <input className="time_l fl" id="callDate" placeholder="选择日期"/>
              <label htmlFor="callDate" className="time_r fl"><em className="icon-date"/></label>
            </div>
          </div>
        </div>
        <ChooseKeyword />