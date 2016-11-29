/**
 * Created by zz on 2016/11/7.
 */
import React from 'react';

// 从redux-devtools中引入
import { createDevTools } from 'redux-devtools';

// Monitors是单独的包,我们也可以自己定义一个
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

// createDevTools 通过一个监视器和产生器来创建一个DevTools component
const DevTools = createDevTools(
  // Monitors 是一个个单独的props.
  // 查找这些包的github地址来学习了解他们的props.
  // 这里,我们把LogMonitor放在DockMonitor里.
  // 注意: DockMonitor默认是可见的.
  <DockMonitor toggleVisibilityKey='ctrl-h'
               changePositionKey='ctrl-q'
               defaultIsVisible={true}>
    <LogMonitor theme='tomorrow' />
  </DockMonitor>
);

export default DevTools;
