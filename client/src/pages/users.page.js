/* eslint-disable react/display-name, react/prop-types */

import React, { useState, useEffect }  from 'react';
import {Cookies} from 'react-cookie';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { withRouter, Link, useLocation, useHistory } from 'react-router-dom';
import { Button, Icon, Table, Tag, Row, Tabs, Select, Form, Input, Modal, Drawer,
  Col, Descriptions,
  Popover } from 'antd';
import { userApi } from '../api';
import { addAdmin } from '../reducers/user.reducer';
const { Option } = Select;
const { TabPane } = Tabs;
const cookies = new Cookies();

const CreateUserForm = ({form, createUser, isAddingUser}) => {
  const [confirmDirty, setConfirmDirty] = useState(false);
  const {t} = useTranslation();
  const history = useHistory();
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields( async (err, values) =>  {
      if (!err) {
        const res = await createUser({
          email: values.email,
          password: values.password,
          fullName: values.fullName,
          phoneNumber: values.phoneNumber
        });
        console.log('create admin',res);
        if(res){
          history.push('/users');
        }
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
      <Form.Item label={t('email')}>
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
      <Form.Item label={t('password')} hasFeedback>
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
      <Form.Item label={t('confirm')} hasFeedback>
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
      <Form.Item label={t('full_name')}>
        {getFieldDecorator('fullName', {
          rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
        })(<Input />)}
      </Form.Item>
      <Form.Item label={t('phone_number')}>
        {getFieldDecorator('phoneNumber', {
          rules: [{ required: true, message: 'Please input your phone number!' }],
        })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" loading={isAddingUser}>
          {t('add_user')}
        </Button>
      </Form.Item>
    </Form>
  );
};

const UsersPage = ({language, setshowLayout, setTab, isAddingUser, createUser}) => {

  const {t, i18n} = useTranslation();
  const history = useHistory();
  const currUser = cookies.get('CURR_USER');
  // const {url} = useRouteMatch();
  const [showDrawer, setShowDrawer] = useState(false);
  const [userDetail, setUserDetail] = useState(null);
  useEffect(() => {
    if(!currUser){
      history.push('/login');
    }
  });

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  // useEffect(() => {
  //   i18n.changeLanguage(language);
  // }, [language]);

  const location = useLocation();
  const [userList, setUserList] = useState(null);
  const [adminList, setAdminList] = useState(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    async function checkLocation() {
      await setTab(location.pathname);
      if(location.pathname === '/login'){
        await setshowLayout(false);
      }
      else{
        await setshowLayout(true);
      }
    }
    checkLocation();
  });

  async function loadData() {
    const resUsers = await userApi.getUsers();
    const resAdmins = await userApi.getAdmins();
    console.log('users', resUsers.data);
    console.log('admin', resAdmins.data);
    await setUserList(resUsers.data);
    await setAdminList(resAdmins.data);
  }

  useEffect(() => {
    loadData();
  }, []);

  // const deleteUser =  async (email) => {
  //   await userApi.deleteUser(email)
  // }

  const callback = (key) => {
    console.log(key);
  };

  const WrappedCreateUserForm = Form.create()(CreateUserForm);

  return (
    <div style={{height: '100%'}}>
      <Row className='page-title'>
        <h1 className='page-title-text'>{t('all_accounts')}</h1>
        <Link>
          <Button className='float-right-btn' type='primary' onClick={async () => {
            await setShowModal(true);
          }}>
            <Icon type='user-add'/>
            {
              t('add_admin')
            }
          </Button>
        </Link>
        <Modal 
          title="Add Admin"
          visible={showModal}
          onOk={async () => {
            await setShowModal(false);
          }}
          onCancel={async () => {
            await setShowModal(false);
          }}
        >
          <WrappedCreateUserForm createUser={createUser} isAddingUser={isAddingUser}/>
        </Modal>
      </Row>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab={t('students')} key="students">
          <Table
            columns={
              [
                {
                  title: t('full_name'),
                  dataIndex: 'fullName',
                  key: 'fullName'
                },
                {
                  title: t('email'),
                  dataIndex: 'email',
                  key: 'email'
                },
                {
                  title: t('phone_number'),
                  dataIndex: 'phoneNumber',
                  key: 'phoneNumber'
                },
                {
                  title: t('address'),
                  dataIndex: 'address',
                  key: 'address'
                },
                {
                  title: t('role'),
                  dataIndex: 'type',
                  key: 'type',
                  render: type => (
                    <span>
                      <Tag color='geekblue' key={type}>
                        {t('student')}
                      </Tag>
                    </span>
                  )
                },
                {
                  title: t('status'),
                  dataIndex: 'status',
                  key: 'status',
                  render: (status, record) => (
                    <div>
                      {
                        
                        <Link className='action-btn'>
                          <Popover content={(
                            <span>{status === 1 ? t('lock') : t('unlock')}</span>
                          )}>
                            <Button className={!(status === 1) ? 'lock' : 'unlock'} onClick={async() => {
                              record.status = status === 1 ? 0 : 1;
                              await userApi.changeUser(record.email, record);
                              loadData();
                            }}>
                              {!(status === 1) ? t('block') : t('active')}
                            </Button>
                          </Popover>
                        </Link>
                          
                      }
                    </div>
                  )
                },
                {
                  title: t('action'),
                  key: 'action',
                  dataIndex: 'email',
                  render: (email, record) => (
                    <div>
                      <Link className='action-btn'>
                        <Popover content={(
                          <span>{t('detail')}</span>
                        )}>
                          <Button type='primary' onClick={async () => {
                            await setUserDetail(record);
                            await setShowDrawer(true);
                          }}>
                            <Icon type='eye'/>
                          </Button>
                        </Popover>

                      </Link>
                    </div>
                  )
                },
              ]
            }

            dataSource={
              userList ? userList.filter((user) => user.type===2): null
            }
            scroll={{ y: 300}}
          />
        </TabPane>
        <TabPane tab={t('teachers')} key="teacher">
          <Table
            columns={
              [
                {
                  title: t('full_name'),
                  dataIndex: 'fullName',
                  key: 'fullName'
                },
                {
                  title: t('email'),
                  dataIndex: 'email',
                  key: 'email'
                },
                {
                  title: t('phone_number'),
                  dataIndex: 'phoneNumber',
                  key: 'phoneNumber'
                },
                {
                  title: t('address'),
                  dataIndex: 'address',
                  key: 'address'
                },
                {
                  title: t('role'),
                  dataIndex: 'type',
                  key: 'type',
                  render: type => (
                    <span>
                      <Tag color='geekblue' key={type}>
                        {t('teacher')}
                      </Tag>
                    </span>
                  )
                },
                {
                  title: t('status'),
                  dataIndex: 'status',
                  key: 'status',
                  render: (status, record) => (
                    <div>
                      {
                        <Link className='action-btn'>
                          <Popover content={(
                            <span>{status === 1 ? t('lock') : t('unlock')}</span>
                          )}>
                            <Button className={!(status === 1) ? 'lock' : 'unlock'} onClick={async() => {
                              record.status = status === 1 ? 0 : 1;
                              await userApi.changeUser(record.email, record);
                              loadData();
                            }}>
                              {!(status === 1) ? t('block') : t('active')}
                            </Button>
                          </Popover>
                        </Link>
                      }
                    </div>
                  )
                },
                {
                  title: t('action'),
                  key: 'action',
                  dataIndex: 'email',
                  render: (email, record) => (
                    <div>
                      <Link className='action-btn'>
                        <Popover content={(
                          <span>{t('detail')}</span>
                        )}>
                          <Button type='primary' onClick={async () => {
                            await setUserDetail(record);
                            await setShowDrawer(true);
                          }}>
                            <Icon type='eye'/>
                          </Button>
                        </Popover>

                      </Link>
                    </div>
                  )
                },
              ]
            }

            dataSource={
              userList ? userList.filter((user) => user.type===1): null
            }
            scroll={{ y: 300}}
          />
        </TabPane>
        <TabPane tab={t('admin')} key="admins">
          <Table
            columns={
              [
                {
                  title: t('full_name'),
                  dataIndex: 'fullName',
                  key: 'fullName'
                },
                {
                  title: t('email'),
                  dataIndex: 'email',
                  key: 'email'
                },
                {
                  title: t('phone_number'),
                  dataIndex: 'phoneNumber',
                  key: 'phoneNumber'
                },
                {
                  title: t('role'),
                  dataIndex: 'role',
                  key: 'role',
                  render: role => (
                    <span>
                      <Tag color={role === 1 ? 'geekblue' : 'green'} key={role}>
                        {role===0 ? 'SUPERADMIN': 'ADMIN'}
                      </Tag>
                    </span>
                  )
                },
                {
                  title: t('status'),
                  dataIndex: 'status',
                  key: 'status',
                  render: (status, record) => (
                    <div>
                      {
                        record.role === 1 ?
                          <Link className='action-btn'>
                            <Popover content={(
                              <span>{status === 1 ? t('lock') : t('unlock')}</span>
                            )}>
                              <Button className={!(status === 1) ? 'lock' : 'unlock'} onClick={async() => {
                                record.status = status === 1 ? 0 : 1;
                                await userApi.changeAdmin(record.email, record);
                                loadData();
                              }}>
                                {!(status === 1) ? t('block') : t('active')}
                              </Button>
                            </Popover>
                          </Link>
                          :
                          null
                      }
                    </div>
                  )
                },
                {
                  title: t('action'),
                  key: 'action',
                  dataIndex: 'email',
                  render: (email, record) => (
                    <div>
                      <Link className='action-btn'>
                        <Popover content={(
                          <span>{t('detail')}</span>
                        )}>
                          <Button type='primary' onClick={async () => {
                            await setUserDetail(record);
                            await setShowDrawer(true);
                          }}>
                            <Icon type='eye'/>
                          </Button>
                        </Popover>
                      </Link>
                    </div>
                  )
                },
              ]
            }

            dataSource={
              adminList ? adminList.map((user, index) => ({
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                status: user.status,
                key: index
              })): 
                null
            }
            scroll={{ y: 300}}
          />
        </TabPane>
      </Tabs>
      <Drawer
        title={t('user_detail')}
        placement="right"
        closable={true}
        onClose={async () => {
          await setShowDrawer(false);
        }}
        visible={showDrawer}
        width='25%'
      >
        <Row type='flex' justify='center' align='middle' className='login-container'>
          <Col span={12} className='create-user-form-container'>
            {
              userDetail ? 
                <>
                  {
                    <Descriptions column={1}>
                      <Descriptions.Item label="UserName">
                        {userDetail.fullName}
                      </Descriptions.Item>
                      <Descriptions.Item label="Telephone">
                        {userDetail.phoneNumber}
                      </Descriptions.Item>
                      <Descriptions.Item label="Email">
                        {userDetail.email}
                      </Descriptions.Item>
                      {
                        userDetail.role ?
                          <Descriptions.Item label="Role">
                            {userDetail.role === 0 ? 'SUPERADMIN' : 'ADMIN'}
                          </Descriptions.Item>
                          :
                          <Descriptions.Item label="Address">
                            {userDetail.address}
                          </Descriptions.Item>
                      }
                      {
                        userDetail.type ?
                          <Descriptions.Item label="Role">
                            {userDetail.type === 1 ? t('teacher') : t('student')}
                          </Descriptions.Item>:
                          ''
                      }
                    </Descriptions>
                  }
                </>  
                :
                ''
            }
          </Col> 
        </Row>
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  language: state.appReducer.language,
  isAddingUser: state.userReducer.isAddingUser
});

const mapDispatchToProps = (dispatch) => ({
  createUser: (data) => dispatch(addAdmin(data))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersPage));
