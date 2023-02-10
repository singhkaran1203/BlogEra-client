import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Blogcontextprovider } from './context/blogcontext';

ReactDOM.render(
  <Blogcontextprovider>
  <App /> 
  </Blogcontextprovider>,
  document.getElementById('root')
);
