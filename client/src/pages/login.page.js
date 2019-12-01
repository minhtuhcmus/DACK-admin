import React from 'react';
import { useTranslation } from 'react-i18next';
const LoginPage = ({t}) => {
  return (
    <h5>{`Login ${t('greeting')}`}</h5>
  );
}

export default LoginPage;