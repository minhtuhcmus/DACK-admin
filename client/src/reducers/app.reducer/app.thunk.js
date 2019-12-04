import {
  doChangeLanguage
} from './app.action';

export const changeLanguage = (language) => async dispatch => {
  console.log('thunk', language);
  dispatch(doChangeLanguage(language));
}