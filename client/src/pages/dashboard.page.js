
/* eslint-disable react/prop-types */

import React, {
  useEffect }  from 'react';
import {Cookies} from 'react-cookie';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { withRouter, useLocation, useHistory } from 'react-router-dom';

const cookies = new Cookies();
const DashboardPage = ({language, setshowLayout, setTab}) => {

  const {i18n} = useTranslation();
  const history = useHistory();
  const currUser = cookies.get('CURR_USER');
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

  return (
    <iframe
      src="http://167.179.80.90:5000/public/dashboard/673e7457-e1a1-422c-9adc-dc0b5c80fc18#refresh=60"
      width="100%"
      height="550"
    />


  );
};

const mapStateToProps = (state) => ({
  language: state.appReducer.language
});

const mapDispatchToProps = () => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardPage));
