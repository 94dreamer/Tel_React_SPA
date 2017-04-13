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

## React开发过程中的一些坑和深刻的debugger。

### 一、AJAX

#### 1.此处为什么放弃fetch？原因有几个

1. fetch的兼容性较差

2. fetch暂时不支持中断，没有相关API。

因为这个原因所以没有办法在react的es6语法环境中，在不使用isMounted()的情况下使用类似ajax的abort()方法在组件卸载的生命周期内停止异步操作，防止报错。

#### 2.$.ajax的坑

1. ajax的success函数内使用this.setState()，调用的是XHR对象，所以需要在ajax外层that=this，保存一下this的指向于组件。或者是bind(this)。

2. ajax如果是异步的 后面的如果调用到ajax内的数据取不到，解决方案是要么改成ajaxType改成同步，要么注意数据为空问题。

### 二、使用Redux

#### 1.使用connect连接组件时，注入依赖的select选择的store中的指定细节数据，此时就无法获取父级传递的props。

### 三、组件

#### 1.onClick时注意大小写 onClick={this.handleClick} ，千万不要加括号，就自动执行了。

#### 2.循环的map内，每个标签都需要一个key值，唯一值。

#### 3.Component's children should not be mutated. 使用|| 或者 && 的时候一定要保证有输出。

#### 4.组件的render优化全靠生命周期的shouldComponentUpdate内的判断，来优化不相干子节点的更新渲染。

#### 5.慎用setState和大量state存储，尽可能使用props。

### 四、npm

1."build": "set NODE_ENV=production && webpack --colors --profile"时，设置环境变量，window系统下使用set，而mac下需要使用export。


cnpm install --save-dev redux-devtools redux-devtools-log-monitor redux-devtools-dock-monitor