import React, { useState, useEffect } from 'react'; 
import { Switch } from 'antd';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../reducers/app.reducer';
const LanguageToggle = ({language, changeLanguage}) => {
  const [checked, setChecked] = useState(true);
  const {i18n} = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  },[language]);

  return (
    <Switch className={classNames({'ant-switch-uncheck': !checked})} checkedChildren='EN' unCheckedChildren='VI' checked={checked} onChange={(checked) => {
      console.log('checked', checked);
      if(checked){
        console.log('change to en');
        changeLanguage('en');
      }
      else{
        console.log('change to vi');
        changeLanguage('vi');
      }
      setChecked(checked);
    }}></Switch>
  );
}

const mapStateToProps = (state) => ({
  language: state.appReducer.language
}); 

const mapDispatchToProps = (dispatch) => ({
  changeLanguage: (language) => dispatch(changeLanguage(language))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageToggle);