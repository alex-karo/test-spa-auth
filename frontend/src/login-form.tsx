import {
  Form, Icon, Input, Button,
} from 'antd';
import React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { login } from './api';

interface Props {
  onSuccessfulLogin?: (token: string) => void;
}

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

interface State {
  globalError?: string;
}

class HorizontalLoginForm extends React.Component<Props & FormComponentProps, State> {
  state: State = {};

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({globalError: undefined});
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          const token = await login(values.email, values.password);
          if (this.props.onSuccessfulLogin) {
            this.props.onSuccessfulLogin(token);
          }
        } catch (e) {
          this.setState({globalError: e.message});
        }
      }
    });
  }

  render() {
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;

    // Only show error after a field is touched.
    const emailError = isFieldTouched('email') && getFieldError('email');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item
          validateStatus={emailError ? 'error' : ''}
          help={emailError || ''}
        >
          {getFieldDecorator('email', {
            rules: [{required: true, message: 'Please input your email!'}],
          })(
            <Input prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Email"/>
          )}
        </Form.Item>
        <Form.Item
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}
        >
          {getFieldDecorator('password', {
            rules: [{required: true, message: 'Please input your password!'}],
          })(
            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                   placeholder="password"/>
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Log in
          </Button>
        </Form.Item>
        {this.state.globalError ? <div style={{color: 'red'}}>{this.state.globalError}</div>   : null}
      </Form>
    );
  }
}

interface LoginForm extends FormComponentProps {
  email: string;
  password: string;
}

export const LoginForm = Form.create<LoginForm>({name: 'login_form'})(HorizontalLoginForm);
