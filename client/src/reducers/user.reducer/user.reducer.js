/* eslint-disable no-unused-vars */

import userAction from './user.action';

const INITIAL_STATE = {
  isAddingUser: false
};

const applyaddAdmin = (state, action) => ({
  ...state,
  isAddingUser: true
});

const applyaddAdminFail = (state, action) => ({
  ...state,
  isAddingUser: false
});

const applyaddAdminSuccess = (state, action) => ({
  ...state,
  isAddingUser: false
});

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userAction.ADD_USER:{
      return applyaddAdmin(state, action);
    }

    case userAction.ADD_USER_FAIL:{
      return applyaddAdminFail(state, action);
    }

    case userAction.ADD_USER_SUCCESS:{
      return applyaddAdminSuccess(state, action);
    }

    default: return state;
  }
};

export default reducer;