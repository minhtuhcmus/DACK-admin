const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';

export default {
  CHANGE_LANGUAGE
};

const doChangeLanguage = (language) => ({
  type: CHANGE_LANGUAGE,
  payload:{
    language
  }
});

export {
  doChangeLanguage
};