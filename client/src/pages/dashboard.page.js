import React, { useState, useEffect }  from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from '../components';
import {userOnly} from '../hocs';
import { withRouter, Link } from 'react-router-dom';
import { Button, Icon } from 'antd';

const DashboardPage = ({language}) => {

  const {t, i18n} = useTranslation();

  useEffect(() => {
    console.log('dashboard lang', language);
    i18n.changeLanguage(language);
  }, [language]);

  // useEffect(() => {
  //   console.log('dashboard lang', language);
  //   i18n.changeLanguage(language);
  // }, [language]);

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

export default withRouter(connect(
  mapStateToProps, 
  mapDispatchToProps
)(userOnly(DashboardPage)));