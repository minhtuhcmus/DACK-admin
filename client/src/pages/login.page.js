/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import { useTranslation } from 'react-i18next';
import { withRouter, useLocation, useHistory } from 'react-router-dom';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import logo from '../assets/logo225.png';
import { login } from '../reducers/auth.reducer';
import { Cookies } from 'react-cookie';

const NormalLoginForm = ({ form, login }) => {
  const {t} = useTranslation();
  const history = useHistory();
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields( async (err, values) =>  {
      if (!err) {
        const res = await login(values.email, values.password);
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
        {getFieldDecorator('email', {
          rules: [{
            type: 'email',
            message: 'The input is not valid E-mail!',
          },{ required: true, message: t('require_username') }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder={t('email')}
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
        <Button type="primary" htmlType="submit" className="login-form-button">
          {t('login')}
        </Button>
      </Form.Item>
    </Form>
  );
};

const LoginPage = ({language, setshowLayout, login, errorMessage}) => {
  const {i18n} = useTranslation();
  const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
  const location = useLocation();
  const cookies = new Cookies();
  const history = useHistory();

  useEffect(() => {
    async function checkLocation() {
      if(location.pathname === '/login'){
        await setshowLayout(false);
      }
      else{
        await setshowLayout(true);
      }
    }
    checkLocation();
  });
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <>
      {
        cookies.get('CURR_USER') ?
          history.push('/')
          :
          <Row type='flex' justify='center' align='middle' className='login-container'>
            <Col span={6}>
              <img className='app-logo' alt='app-logo' src={logo}/>
              <p style={{color: 'red'}}>{errorMessage}</p>
              <WrappedNormalLoginForm login={login}/>
            </Col>
          </Row>
      }
    </>

  );
};

const mapStateToProps = (state) => ({
  language: state.appReducer.language,
  errorMessage: state.authReducer.error
});

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(login(email, password))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
