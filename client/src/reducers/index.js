import { combineReducers } from 'redux';
import { appReducer } from './app.reducer';
import { authReducer } from './auth.reducer';
import { userReducer } from './user.reducer';

const rootReducer = combineReducers({
  appReducer,
  authReducer,
  userReducer
});

export default rootReducer;