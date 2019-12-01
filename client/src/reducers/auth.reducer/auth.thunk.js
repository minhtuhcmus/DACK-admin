import { Cookies } from 'react-cookie';

import { authApi } from '../../api';
import {
  doClearResult,
  doLogin,
  doLoginFail,
  doLoginSuccess,
  doLogout 
} from './auth.action';
export const login = (email, password) => async dispatch => {
  dispatch(doLogin());
  const res = await authApi.login(email, password);
  if(res.user){
    const cookies = new Cookies();
    cookies.set('MY_TOKEN', res.token);
    cookies.set('CURR_USER', res.user);
    dispatch(doLoginSuccess(res.user)); 
  }
  else{
    dispatch(doLoginFail(res.message));
  }
}