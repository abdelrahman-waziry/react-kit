import React from 'react';
import { Form, Input, Icon, Button, Checkbox, Card, message } from 'antd';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import "antd/dist/antd.css"
import "./../../style.css"
import { login } from '../../service';
import { setLocale } from '../../store/actions';

class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            inputType: 'password',
            loading: false
        }
        message.config({
          top: '90%',
          transitionName: 'move-down'
        })
    }
    
    handleSubmit = (e) => {
        this.setState({loading: true})
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.props.dispatch(login({email: values.email, password: values.password}, () => {
              this.setState({loading: false})
              this.props.history.push('/')
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
                <div>
                  <button onClick={(e) => {
                    e.preventDefault()
                    this.props.dispatch(setLocale(this.props.currentLocale == 'en' ? 'ar' : 'en'))
                  }}>{this.props.currentLocale}</button>
                </div>
                <Form.Item>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(
                    <Checkbox>تذكرني</Checkbox>
                  )}
                  <a className="login-form-forgot" href="#">نسيت كلمة المرور</a>
                  <Button loading={this.state.loading} type="primary" htmlType="submit" className="login-form-button">
                    {this.props.authResources.login}
                  </Button>
                  أو <Link to="/register">سجل الآن</Link>
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
    token: state.auth.token,
    authResources: state.auth.currentResource.auth,
    currentLocale: state.auth.currentLocale
  }
}

export default connect(mapStateToProps)(WrappedNormalLoginForm)
