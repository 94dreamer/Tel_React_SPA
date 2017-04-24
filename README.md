## 项目介绍

1. 该项目是我之前用JQuery/Template/WebScoket/ES6/Gulp/Webpack实现一个较复杂的单页面Web应用，为真实业务项目。主要是为 *电话销售/直接管理/上层管理* 三种角色提供对应的业务应用功能，主要包括Home页、Work页、Record页。  
2. 其中 电话销售 根据分配的未拨队列／已拨队列／锁定队列，来进行电话销售，三种队列有不同的配置筛选项（包括地区／队列状态／部组／日期／关键字／客户状态／标签...等等），其中电话销售有部署了呼叫中心接入的WebScoket系统和非呼叫中心入口的区别。  
3. Work页只有销售才能够进入，其中的展示逻辑和操作流程、提交流程比较复杂，在此不做过多叙述。  
4. 为什么重构？初衷并不是因为我想拿该项目练手React，而是因为在用原技术路线时候，复杂的业务逻辑和组件展示和视图切换由大量过程式结合少量数据控制视图让我越来越感到没有安全感（其实在项目一开始leader和我就在商榷技术选型是否使用react试水，后考虑到工期的紧迫，使用react技术栈存在一定的填坑风险，只能作罢。事实证明这个选择不能算错，后面和第三个呼叫中心的对接也耗费了大量时间）。
5. 重构之后我试用了Rect+Webpack的经典组合，基于SPA的状态管理十分复杂，我理所当用的引入了Reudx，然后在开发环境中加入了Redux-Devtools。陆续我加入了Redux-Thunk／React-Router。
6. 用以上篇幅简单对整个React SPA做简要描述，另外也告诉大家这是一个基于真实业务重构的复杂SPA应用，而不是一个简单的React Demo，component和action、reducers我都尽可能考虑贴近真实业务实现。
7. 感想：完全的数据到视图的映射，让我感觉十分有安全感。在非简易逻辑的交互中，操作数据来声明进而控制视图的改变，比过程时的JQuery代码更容易思考。

## 项目文件配置

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

### 基本写法

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

### 深刻的坑和debugger。

#### 一、AJAX

> 1.此处为什么放弃fetch？原因有几个

1. fetch的兼容性较差

2. fetch暂时不支持中断，没有相关API。

3. *extra* 尴尬的是因为后来把ajax放到了dispatch的action函数中，而不是在组件进行ajax交互，导致ajax的abort功能也一直没有用到。。。

因为这个原因所以没有办法在react的es6语法环境中，在不使用isMounted()的情况下使用类似ajax的abort()方法在组件卸载的生命周期内停止异步操作，防止报错。

> 2.$.ajax的坑

1. ajax的success函数内使用this.setState()，调用的是XHR对象，所以需要在ajax外层that=this，保存一下this的指向于组件。或者是bind(this)。

2. ajax如果是异步的 后面的如果调用到ajax内的数据取不到，解决方案是要么改成ajaxType改成同步，要么注意数据为空问题。

#### 二、使用Redux/React-Redux/Redux-DevTools

1. 使用connect连接组件时，注入依赖的select选择的store中的指定细节数据，此时就无法获取父级传递的props。
2. connect允许传入两个参数，第一个是筛选可用的state来传入props，第二个是筛选可用的action来dispatch。
3. Redux-DevTools一开始的配置走了坑,附上自己的 [redux-devtools中文文档](https://github.com/94dreamer/Note/tree/master/redux-devtools全攻略)

#### 三、组件

1. onClick时注意大小写 onClick={this.handleClick} ，千万不要加括号，就自动执行了。

2. 循环的map内，每个标签都需要一个key值，唯一值，注意不要用index值（想想为什么）。

3. Component's children should not be mutated. 使用|| 或者 && 的时候一定要保证有输出 不然输出false或者true就有问题了。

4. 组件的render优化很大程度靠生命周期的shouldComponentUpdate内的判断，来优化不相干子节点的更新渲染。

5. 慎用setState和大量state存储，尽可能使用props。

#### 四、npm

1. "build": "set NODE_ENV=production && webpack --colors --profile"时，设置环境变量，window系统下使用set，而mac下需要使用export，有个额外的插件可以平台通用。

2. --colors 输出结果带彩色，比如：会用红色显示耗时较长的步骤
--profile输出性能数据，可以看到每一步的耗时
--display-modules默认情况下 node_modules 下的模块会被隐藏，加上这个参数可以显示这些被隐藏的模块 这次命令行的结果已经很有参考价值，可以帮助我们定位耗时比较长的步骤

cnpm install --save-dev redux-devtools redux-devtools-log-monitor redux-devtools-dock-monitor