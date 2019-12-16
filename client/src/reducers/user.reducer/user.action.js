const ADD_USER = 'ADD_USER';
const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
const ADD_USER_FAIL = 'ADD_USER_FAIL';

export default {
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL 
};

const doaddAdmin = (data) => ({
  type: ADD_USER,
  payload:{
    data
  }
});

const doaddAdminSuccess = () => ({
  type: ADD_USER_SUCCESS,
  payload: {
  }
});

const doaddAdminFail = () => ({
  type: ADD_USER_FAIL,
  payload:{
  }
});

export {
  doaddAdmin,
  doaddAdminFail,
  doaddAdminSuccess
};