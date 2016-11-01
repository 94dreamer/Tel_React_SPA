import React,{PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
/* import './App.css';*/

const App = props=>(
  <div>
    <h1>React Router</h1>
    <ul style={{overflow:"hidden"}}>
      <li style={{float:"left",marginRight:10}}><IndexLink to="/">Home</IndexLink></li>
      <li style={{float:"left",marginRight:10}}><Link to="/work">Work</Link></li>
      <li style={{float:"left",marginRight:10}}><Link to="/user">User</Link></li>
    </ul>
    {props.children}
  </div>
);

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
