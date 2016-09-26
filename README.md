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
