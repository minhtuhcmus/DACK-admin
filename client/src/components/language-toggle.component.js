import React, { useState } from 'react'; 
import { Switch } from 'antd';
import { connect } from 'react-redux';
import classNames from 'classnames';
const LanguageToggle = ({i18n}) => {
  const [checked, setChecked] = useState(true);
  return (
    <Switch className={classNames({'ant-switch-uncheck': !checked})} checkedChildren='EN' unCheckedChildren='VI' checked={checked} onChange={(checked) => {
      if(checked){
        i18n.changeLanguage('en');
      }
      else{
        i18n.changeLanguage('vi');
      }
      setChecked(checked);
    }}></Switch>
  );
}

const mapStateToProps = (state) => ({
}); 

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageToggle);