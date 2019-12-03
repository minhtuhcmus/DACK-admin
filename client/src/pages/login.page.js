import React, { useState, useEffect } from 'react';
import { doLogin } from '../reducers/auth.reducer';
import {connect} from 'react-redux';
import { useTranslation } from 'react-i18next';
import { withRouter, useLocation, useHistory } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import logo from '../assets/logo225.png';
import { login } from '../reducers/auth.reducer';
import Password from 'antd/lib/input/Password';
import { Cookies } from 'react-cookie';

const NormalLoginForm = ({ form, login }) => {
  const {t} = useTranslation();
  const history = useHistory();
  const handleSubmit = e => {
    e.preventDefault();
      form.validateFields( async (err, values) =>  {
      if (!err) {
        const res = await login(values.username, values.password);
        if(res){
          history.push('/dashboard');
        }
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

const LoginPage = ({language, setshowLayout, login}) => {
  const {i18n} = useTranslation();
  const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
  const location = useLocation();
  const cookies = new Cookies(); 
  const history = useHistory();
 
  useEffect(() => {
    if(location.pathname === '/login'){
      setshowLayout(false);
    }
    else{
      setshowLayout(true);
    }
  });
  useEffect(() => {
    console.log('login lang', language);
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <>
    {
      cookies.get('CURR_USER') ?
      history.push('/')
      :
      <Row type='flex' justify='center' align='middle' className='login-container'>
        <Col>
          <img className='app-logo' alt='app-logo' src={logo}/>
          <WrappedNormalLoginForm login={login}/>
        </Col> 
      </Row>
    }
    </>
    
  );
}

const mapStateToProps = (state) => ({
  language: state.appReducer.language
}); 

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => dispatch(login(username, password))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));