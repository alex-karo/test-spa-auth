import React, { Component } from 'react';
import './app.css';
import 'antd/dist/antd.css';
import { LoginForm } from './login-form';
import { getCurrentUser } from './api';
import Button from 'antd/lib/button';

interface Props {
}

interface State {
  token?: string;
  user?: { email: string, name: string };
}

export class App extends Component<Props, State> {
  state: State = {};

  onLogin = async (token: string) => {
    const user = await getCurrentUser(token);
    this.setState({user, token});
  };

  onLogOut = () => {
    this.setState({user: undefined, token: undefined});
  }

  render() {
    return (
      <div className="App">
        {this.state.token && this.state.user ? <div>
          <div>You logged in as {this.state.user.name} [{this.state.user.email}]</div>
          <Button onClick={this.onLogOut}>Log Out</Button>
        </div> : <LoginForm onSuccessfulLogin={this.onLogin}/>
        }
      </div>
    );
  }
}
