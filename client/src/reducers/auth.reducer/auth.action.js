const LOGIN = 'LOGIN';
const LOGIN_FAIL = 'LOGIN_FAIL';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const CLEAR_RESULT = 'CLEAR_RESULT';
const LOGOUT = 'LOGOUT';

export default {
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  CLEAR_RESULT,
  LOGOUT
}

const doClearResult = () => ({
  type: CLEAR_RESULT
});

const doLogout = () => ({
  type: LOGOUT,
  payload:{
  }
});

const doLogin = (email, password) => ({
  type: LOGIN,
  payload:{
    email,
    password
  }
})

const doLoginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload:{
    user
  }
});

const doLoginFail = message => ({
  type: LOGIN_FAIL,
  payload: {
    message
  }
});

export {
  doClearResult,
  doLogin,
  doLoginFail,
  doLoginSuccess,
  doLogout
}