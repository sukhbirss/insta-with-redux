import { LOGIN_SUCCESS,USER_LOADED,LOGOUT } from '../actions/types';

const initialState = {
  token: localStorage.getItem('jwt'),
  isAuthenticated: null,
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (action.type) {

    case LOGIN_SUCCESS:
    console.log(payload.user)
      return {
        ...state,
        token:payload.token,
        user: payload.user,
        isAuthenticated: true
      };
    case USER_LOADED:
      return {
        ...state,
        user: payload.user,
        isAuthenticated: true
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
}
