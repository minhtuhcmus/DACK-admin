import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect, useHistory } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { logout } from '../reducers/auth.reducer';
import {LanguageToggle } from '../components';
import { Layout } from 'antd';
import logo from '../assets/logo225.png';
import { useTranslation } from 'react-i18next';
import { Typography } from 'antd';

const { Title } = Typography;

const { Header, Footer, Sider, Content } = Layout;

const userOnly = (MyComponent) => {

  
  const UserWrapper = ({ logoutUser }) => {
    const history = useHistory();
    const cookies = new Cookies();  
    const curr_user = cookies.get('CURR_USER');
    console.log(curr_user);

    useEffect(() => {
      if(!curr_user){
        history.push('/login');      
      }
    });

    const {t} = useTranslation();

    const handleLogout = () => {
      logoutUser();
      history.push('/login');
    }

    return (
      <MyComponent user={curr_user}/>
    )
  }

  const mapStateToProps = (state) => ({
    isAuthenticated: state.authReducer.isAuthenticated
  }); 
  
  const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logout())
  });

  return compose(
    connect(
      mapStateToProps,
      mapDispatchToProps 
    )
  )(UserWrapper)
}

export default userOnly;