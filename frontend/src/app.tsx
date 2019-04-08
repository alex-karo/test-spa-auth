import React, { Component } from 'react';
import './app.css';
import 'antd/dist/antd.css';
import { LoginForm } from './login-form';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <LoginForm/>
      </div>
    );
  }
}
