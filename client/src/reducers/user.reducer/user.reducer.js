import userAction from './user.action';

const INITIAL_STATE = {
  isAddingUser: false
}

const applyAddUser = (state, action) => ({
  ...state,
  isAddingUser: true
});

const applyAddUserFail = (state, action) => ({
  ...state,
  isAddingUser: false
});

const applyAddUserSuccess = (state, action) => ({
  ...state,
  isAddingUser: false
});

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userAction.ADD_USER:{
      return applyAddUser(state, action);
    }

    case userAction.ADD_USER_FAIL:{
      return applyAddUserFail(state, action);
    }

    case userAction.ADD_USER_SUCCESS:{
      return applyAddUserSuccess(state, action);
    }

    default: return state;
  }
}

export default reducer;