import { combineReducers } from 'redux';
import { appReducer } from './app.reducer';
import { authReducer } from './auth.reducer';

const rootReducer = combineReducers({
  appReducer,
  authReducer
});

export default rootReducer;