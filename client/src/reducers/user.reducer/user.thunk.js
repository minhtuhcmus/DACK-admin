import { Cookies } from 'react-cookie';
import { userApi } from '../../api';
import {
  doAddUser,
  doAddUserFail,
  doAddUserSuccess
} from './user.action';

const cookies = new Cookies();

export const addUser = (data) => async dispatch => {
  dispatch(doAddUser(data));
  const res = await userApi.addUser(data);
  if(res.returnCode === 1){
    dispatch(doAddUserSuccess());
    return true;
  }
  else{
    dispatch(doAddUserFail());
    return false;
  }
}