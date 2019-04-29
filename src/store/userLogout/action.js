import { push } from 'react-router-redux';

import { reloadAuthorized } from '../../utils/Authorized';

export const LOGOUT = 'LOGOUT';

export const userLogout = () => async dispatch => {
  dispatch({ type: LOGOUT });
  reloadAuthorized();
  dispatch(push('/user/login'));
};
