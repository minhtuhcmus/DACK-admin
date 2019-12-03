import React, { useState, useEffect } from 'react';
import { doLogin } from '../reducers/auth.reducer';
import {connect} from 'react-redux';
import { useTranslation } from 'react-i18next';
import { withRouter, useLocation } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import logo from '../assets/logo225.png';
const NormalLoginForm = ({ form }) => {
  const {t} = useTranslation();
  const handleSubmit = e => {
    e.preventDefault();
      form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  const { getFieldDecorator } = form;
  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: t('require_username') }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder={t('username')}
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: t('require_password') }],
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder={t('password')}
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(<Checkbox>{t('remember_me')}</Checkbox>)}
        <a className="login-form-forgot" href="">
          {t('forgot_password')}
        </a>
        <Button type="primary" htmlType="submit" className="login-form-button">
          {t('login')}
        </Button>
      {t('or')} <a href="">{t('register_now')}</a>
      </Form.Item>
    </Form>
  );
}

const LoginPage = ({language, setLayoutVisible}) => {
  const {i18n} = useTranslation();
  const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
  const location = useLocation();

  useEffect(() => {
    if(location.pathname === '/login'){
      setLayoutVisible(false);
    }
  }, [location]);
  useEffect(() => {
    console.log('login lang', language);
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <Row type='flex' justify='center' align='middle' className='login-container'>
      <Col>
        <img className='app-logo' alt='app-logo' src={logo}/>
        <WrappedNormalLoginForm/>
      </Col> 
    </Row>
  );
}

const mapStateToProps = (state) => ({
  language: state.appReducer.language
}); 

const mapDispatchToProps = (dispatch) => ({
  
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));