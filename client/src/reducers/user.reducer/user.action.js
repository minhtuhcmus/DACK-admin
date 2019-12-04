const ADD_USER = 'ADD_USER';
const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
const ADD_USER_FAIL = 'ADD_USER_FAIL';

export default {
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL 
}

const doAddUser = (data) => ({
  type: ADD_USER,
  payload:{
    data
  }
});

const doAddUserSuccess = () => ({
  type: ADD_USER_SUCCESS,
  payload: {
  }
});

const doAddUserFail = () => ({
  type: ADD_USER_FAIL,
  payload:{
  }
});

export {
  doAddUser,
  doAddUserFail,
  doAddUserSuccess
}