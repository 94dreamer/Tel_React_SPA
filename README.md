# 项目文件配置

```
/dist/		# 构建输出的文件会在这里

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

## 基本写法

1. 用*require.ensure*来分割代码,打包的时候会把这块的代码独立打成一个文件

```
const Manage = (location,cb)=>{
   require.ensure([],require=>{
        cb(null,require('./manage.js'))
   })
}

<Route path='manage' getComponent={Manage} />
```

但是 Webpack2 发布之后，有这种新的写法支持

```
getComponent(nextState, cb) {
    import('./Component.jsx').then(res => cb(null, res.default))
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

1.使用connect连接组件时，注入依赖的select选择的store中的指定细节数据，此时就无法获取父级传递的props。

### 三、组件

1. onClick时注意大小写 onClick={this.handleClick} ，千万不要加括号，就自动执行了。

2. 循环的map内，每个标签都需要一个key值，唯一值。

3. Component's children should not be mutated. 使用|| 或者 && 的时候一定要保证有输出。

4. 组件的render优化全靠生命周期的shouldComponentUpdate内的判断，来优化不相干子节点的更新渲染。

5. 慎用setState和大量state存储，尽可能使用props。

### 四、npm

1."build": "set NODE_ENV=production && webpack --colors --profile"时，设置环境变量，window系统下使用set，而mac下需要使用export，有个额外的插件可以平台通用。

--colors 输出结果带彩色，比如：会用红色显示耗时较长的步骤
--profile输出性能数据，可以看到每一步的耗时
--display-modules默认情况下 node_modules 下的模块会被隐藏，加上这个参数可以显示这些被隐藏的模块 这次命令行的结果已经很有参考价值，可以帮助我们定位耗时比较长的步骤

cnpm install --save-dev redux-devtools redux-devtools-log-monitor redux-devtools-dock-monitor