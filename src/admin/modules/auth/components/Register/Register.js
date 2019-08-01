import React from 'react';
import { Form, Input, Icon, Button, Card, message } from 'antd';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import "antd/dist/antd.css"
import "./../../style.css"
import { register } from '../../service';

class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            inputType: 'password',
            loading: false
        }
        message.config({
          top: '60%',
          transitionName: 'move-down'
        })
    }
    
    handleSubmit = (e) => {
        this.setState({loading: true})
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            var body = {
              email: values.email,
              password: values.password,
              firstName: "Name",
              lastName: "Last Name",
              mobile: "0102900720",
              clientId: "FoundationAPI",
              clientSecret: "FoundationSecretKey",
              accountType: 1
            }
            this.props.dispatch(register(body, (data) => {
              this.setState({loading: false})
              if(data.code === 200){
                this.props.history.push('/')
              }
              else {
                data.errors.forEach(error => {
                  message.error(error.validationMessage ? error.validationMessage : error)
                })
              }
            }))
          }
          else {
            this.setState({loading: false})
          }
        });
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
          <div className="App">
            <Card type="inner" style={{
                width: 400,
                position: 'relative',
                display: "block",
                top: '10em',
                margin: '0 auto'
            }}>
              <img className="logo" alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"/>
              <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                  {getFieldDecorator('email', {
                    rules: [{ required: true , message: 'رجاء إدخال البريد الإلكتروني' }],
                  })(
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                        placeholder="البريد الإلكتروني" 
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'رجاء إدخال كلمة المرور' }],
                  })(
                    <Input 
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                        type={this.state.inputType} 
                        suffix={
                            <Icon 
                                onClick={() => {
                                    this.setState({inputType: this.state.inputType === 'password' ? 'text' : 'password'})
                                }} 
                                type="eye" 
                                style={{ color: 'rgba(0,0,0,.25)' }} 
                            />
                        }
                        placeholder="كلمة المرور" 
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('passwordConfirm', {
                    rules: [{ required: true, message: 'رجاء تأكيد كلمة المرور' }],
                  })(
                    <Input 
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                        type={this.state.inputType} 
                        suffix={
                            <Icon 
                                onClick={() => {
                                    this.setState({inputType: this.state.inputType === 'password' ? 'text' : 'password'})
                                }} 
                                type="eye" 
                                style={{ color: 'rgba(0,0,0,.25)' }} 
                            />
                        }
                        placeholder="تأكيد كلمة المرور" 
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  <Button loading={this.state.loading} type="primary" htmlType="submit" className="login-form-button">
                    سجل الآن
                  </Button>
                  أو <Link to="/login">تسجيل الدخول</Link>
                </Form.Item>
              </Form>
            </Card>
          </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token
  }
}

export default connect(mapStateToProps)(WrappedNormalLoginForm)
