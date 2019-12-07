import {
  doChangeLanguage
} from './app.action';

export const changeLanguage = (language) => async dispatch => {
  dispatch(doChangeLanguage(language));
}