/* eslint-disable no-unused-vars */

import authAction from './auth.action';

const INITIAL_STATE = {
  isAuthenticated: false,
  isLogining  : false,
  user: undefined,
  token: undefined,
  error: true
};

const applyLogout = (state, action) => ({
  ...state,
  isAuthenticated: false
});

const applyClearResult = (state, action) => ({
  ...state,
  result: undefined
});

const applyLogin = (state, action) => ({
  ...state,
  isLogining: true,
  user: undefined,
  token: undefined
});

const applyLoginSuccess = (state, action) => ({
  ...state,
  isLogining: false,
  isAuthenticated: true,
  user: action.payload.user
});

const applyLoginFail = (state, action) => ({
  ...state,
  isLogining: false,
  error: true
});

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case authAction.CLEAR_RESULT: {
      return applyClearResult(state, action);
    }

    case authAction.LOGIN: {
      return applyLogin(state, action);
    }

    case authAction.LOGIN_SUCCESS: {
      return applyLoginSuccess(state, action);
    }

    case authAction.LOGIN_FAIL: {
      return applyLoginFail(state, action);
    }

    case authAction.LOGOUT: {
      return applyLogout(state, action);
    }
   
    default: return state;
  }
};

export default reducer;
