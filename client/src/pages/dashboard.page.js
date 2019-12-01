import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from '../components';
const DashboardPage = ({i18n, t}) => {
  return (
    <div>
      <LanguageToggle i18n={i18n}/>
      <h1>{t('greeting')}</h1>
    </div>
  );
}

const mapStateToProps = (state) => ({
}); 

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);