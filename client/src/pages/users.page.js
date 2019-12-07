import React, { useState, useEffect }  from 'react';
import {Cookies} from 'react-cookie';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { compose } from 'redux';
import { LanguageToggle } from '../components';
import {userOnly} from '../hocs';
import { withRouter, Link, useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import { Button, Icon, Table, Tag, Row, Col, Popover } from 'antd';
import { userApi } from '../api';
const cookies = new Cookies();
const UsersPage = ({language, setshowLayout, setTab}) => {

  const {t, i18n} = useTranslation();
  const history = useHistory();
  const curr_user = cookies.get('CURR_USER');
  const {url} = useRouteMatch();
  useEffect(() => {
    if(!curr_user){
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

  useEffect(() => {
    async function loadData() {
      const res = await userApi.getUsers();
      await setUserList(res.data);
    }

    loadData();
  }, []);

  // const deleteUser =  async (email) => {
  //   await userApi.deleteUser(email)
  // }

  return (
    <div>
      <Row className='page-title'>
        <h1 className='page-title-text'>{t('users')}</h1>
        <Link to='/users/create-user'>
          <Button className='add-user-btn' type='primary' >
            <Icon type='user-add'/>
            {
              t('add_user')
            }
          </Button>
        </Link>
      </Row>
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
                    {role===0 ? 'ADMIN': 'USER'}
                  </Tag>
                </span>
              )
            },
            {
              title: t('action'),
              dataIndex: 'email',
              key: 'action',
              render: email => (
                <div> 
                  <Link className='action-btn' to={`${url}/${email}`}>
                    <Popover content={(
                      <span>{t('detail')}</span>
                    )}>
                      <Button type='primary'>
                        <Icon type='eye'/>
                      </Button>
                    </Popover>
                    
                  </Link>
                  
                  {/* <Link className='action-btn' to={deleteUser(email)}>
                    <Popover content={(
                      <span>{t('delete')}</span>
                    )}>
                      <Button type='danger'>
                        <Icon type='delete'/>
                      </Button>
                    </Popover>
                  </Link> */}
                </div>
                
              )
            }
          ]
        }

        dataSource={userList ? userList.map((user, index) => ({
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          key: index
        })): null}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  language: state.appReducer.language  
}); 

const mapDispatchToProps = (dispatch) => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersPage));