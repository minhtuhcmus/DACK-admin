import React, { useState, useEffect }  from 'react';
import {Cookies} from 'react-cookie';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { compose } from 'redux';
import { LanguageToggle } from '../components';
import {userOnly} from '../hocs';
import { withRouter, Link, useLocation, useHistory } from 'react-router-dom';
import { Button, Icon } from 'antd';
const cookies = new Cookies();
const DashboardPage = ({language, setshowLayout}) => {

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
    <div>
      
      <h1>{t('greeting')}</h1>
      <Link to='/create-user'>
        <Button className='add-user-button' size='large' icon='plus-circle' type='primary'>
          {t('add_user')}
        </Button>
      </Link>
    </div>
  );
}

const mapStateToProps = (state) => ({
  language: state.appReducer.language  
}); 

const mapDispatchToProps = (dispatch) => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardPage));