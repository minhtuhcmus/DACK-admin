/* eslint-disable react/prop-types */
import React, { 
  // useState, 
  useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { 
  // Redirect, 
  useHistory } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { logout } from '../reducers/auth.reducer';
// import {LanguageToggle } from '../components';
// import { Layout } from 'antd';
// import logo from '../assets/logo225.png';
// import { useTranslation } from 'react-i18next';

// const { Title } = Typography;

// const { Header, Footer, Sider, Content } = Layout;

const userOnly = (MyComponent) => {

  
  const UserWrapper = () => {
    const history = useHistory();
    const cookies = new Cookies();  
    const currUser = cookies.get('CURR_USER');

    useEffect(() => {
      if(!currUser){
        history.push('/login');      
      }
    });

    // const handleLogout = () => {
    //   logoutUser();
    //   history.push('/login');
    // };

    return (
      <MyComponent user={currUser}/>
    );
  };

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
  )(UserWrapper);
};

export default userOnly;