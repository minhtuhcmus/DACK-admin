import React, { useState, useEffect }  from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from '../components';
import {userOnly} from '../hocs';
import { Cookies } from 'react-cookie';
import { withRouter, Link, useLocation, useHistory } from 'react-router-dom';
import { Button, Icon, Form, Input, Row, Col, Select } from 'antd';
import { addUser } from '../reducers/user.reducer';
import { func } from 'prop-types';
const { Option } = Select;
const CreateUserForm = ({form, createUser, isAddingUser}) => {
  const [confirmDirty, setConfirmDirty] = useState(false);
  const {t} = useTranslation();
  const handleSubmit = e => {
    e.preventDefault();
      form.validateFields( async (err, values) =>  {
      if (!err) {
        console.log('values', values);
        const res = await createUser({
          username: values.username,
          password: values.password,
          fullName: values.fullName,
          email: values.email,
          phoneNumber: values.phoneNumber
        });
        console.log('res', res);
      }
    });
  };
  const { getFieldDecorator } = form;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  const prefixSelector = getFieldDecorator('prefix', {
    initialValue: '84',
  })(
    <Select style={{ width: 70 }}>
      <Option value="84">+84</Option>
    </Select>,
  );

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  const handleConfirmBlur = async e => {
    const { value } = e.target;
    await setConfirmDirty(confirmDirty || !!value);
  };

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      <Form.Item label='Username'>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Password" hasFeedback>
        {getFieldDecorator('password', {
          rules: [
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              validator: validateToNextPassword,
            },
          ],
        })(<Input.Password />)}
      </Form.Item>
      <Form.Item label="Confirm Password" hasFeedback>
        {getFieldDecorator('confirm', {
          rules: [
            {
              required: true,
              message: 'Please confirm your password!',
            },
            {
              validator: compareToFirstPassword,
            },
          ],
        })(<Input.Password onBlur={handleConfirmBlur} />)}
      </Form.Item>
      <Form.Item label="E-mail">
        {getFieldDecorator('email', {
          rules: [
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ],
        })(<Input />)}
      </Form.Item>
      <Form.Item label='Fullname'>
        {getFieldDecorator('fullName', {
          rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Phone Number">
        {getFieldDecorator('phoneNumber', {
          rules: [{ required: true, message: 'Please input your phone number!' }],
        })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" loading={isAddingUser}>
          Add User
        </Button>
      </Form.Item>
    </Form>
  );
}

const CreateUserPage = ({language, isAddingUser, createUser, setshowLayout}) => {

  const {t, i18n} = useTranslation();
  const WrappedCreateUserForm = Form.create()(CreateUserForm);
  const cookies = new Cookies(); 
  const history = useHistory();
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);
  const curr_user = cookies.get('CURR_USER');
  useEffect(() => {
    if(!curr_user){
      history.push('/login');      
    }
  });

  // useEffect(() => {
  //   console.log('dashboard lang', language);
  //   i18n.changeLanguage(language);
  // }, [language]);

  const location = useLocation();

  useEffect(() => {
    console.log('location', location.pathname);
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

  return (
    <>
    {
      !cookies.get('CURR_USER') ?
      history.push('/')
      :
      <Row type='flex' justify='center' align='middle' className='login-container'>
        <Col>
          <WrappedCreateUserForm createUser={createUser} isAddingUser={isAddingUser}/>
        </Col> 
      </Row>
    }
    </>
  );
}

const mapStateToProps = (state) => ({
  language: state.appReducer.language,
  isAddingUser: state.userReducer.isAddingUser  
}); 

const mapDispatchToProps = (dispatch) => ({
  createUser: (data) => dispatch(addUser(data))
});

export default withRouter(connect(
  mapStateToProps, 
  mapDispatchToProps
)(CreateUserPage));