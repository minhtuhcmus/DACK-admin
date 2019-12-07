import React, { useState, useEffect }  from 'react';
import {Cookies} from 'react-cookie';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { compose } from 'redux';
import { LanguageToggle } from '../components';
import {userOnly} from '../hocs';
import { withRouter, Link, useLocation, useHistory } from 'react-router-dom';
import { Button, Icon, Table, Tag } from 'antd';
import { userApi } from '../api';
const cookies = new Cookies();
const SkillsPage = ({language, setshowLayout, setTab}) => {

  const {t, i18n} = useTranslation();
  const history = useHistory();
  const curr_user = cookies.get('CURR_USER');
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

  return (
    <div>
      
      <h1>{t('skills')}</h1>
      <Table 
        columns={
          [
            {
              title: 'Full Name',
              dataIndex: 'fullName',
              key: 'fullName'
            },
            {
              title: 'E-mail',
              dataIndex: 'email',
              key: 'email'
            },
            {
              title: 'Phone Number',
              dataIndex: 'phoneNumber',
              key: 'phoneNumber'
            },
            {
              title: 'Role',
              dataIndex: 'role',
              key: 'role',
              render: role => (
                <span>
                  <Tag color={role === 1 ? 'geekblue' : 'green'} key={role}>
                    {role===0 ? 'ADMIN': 'USER'}
                  </Tag>
                </span>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SkillsPage));