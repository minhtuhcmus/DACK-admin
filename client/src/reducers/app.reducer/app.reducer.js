import userAction from './app.action';

const INITIAL_STATE = {
  language: 'en'
}

const applyChangeLanguage = (state, action) => ({
  ...state,
  language: action.payload.language
});

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type){
    case userAction.CHANGE_LANGUAGE: {
      return applyChangeLanguage(state, action);
    }
    default: return state;
  }
}

export default reducer;