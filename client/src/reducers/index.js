import { combineReducers } from 'redux';
import auth from './auth';
import userData from './userData';
import post from './post';

export default combineReducers({
  auth,
  userData,
  post
});
