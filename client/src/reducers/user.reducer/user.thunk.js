// import { Cookies } from 'react-cookie';
import { userApi } from '../../api';
import {
  doaddAdmin,
  doaddAdminFail,
  doaddAdminSuccess
} from './user.action';

// const cookies = new Cookies();

export const addAdmin = (data) => async dispatch => {
  dispatch(doaddAdmin(data));
  const res = await userApi.addAdmin(data);
  if(res.returnCode === 1){
    dispatch(doaddAdminSuccess());
    return true;
  }
  else{
    dispatch(doaddAdminFail());
    return false;
  }
};