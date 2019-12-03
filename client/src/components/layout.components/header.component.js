import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { Layout } from 'antd';
const { Header } = Layout;

const MyHeader = () => {
  return(
    <Header>
      <img className='app-logo-navbar' alt='app-logo-navbar' src={logo}/>
      <span className='app-name'>{t('app_name')}</span>
      <div className='language-toggle'>
        <LanguageToggle/>
      </div>
    </Header>
  );      
}

export default MyHeader;