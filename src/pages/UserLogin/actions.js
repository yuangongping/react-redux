import { push } from 'react-router-redux';
import { Message } from '@alifd/next';
import { login } from '../../api/user';
import { setAuthority } from '../../utils/authority';
import { reloadAuthorized } from '../../utils/Authorized';

export const LOGIN = 'LOGIN';

export const userLogin = ({ account, password, remember }) => async dispatch => {
  const { data, status, info } = await login({ account, password });
  if (status) {
    if (remember) {
      localStorage.Token = data.token;
    } else {
      sessionStorage.Token = data.token;
    }
    dispatch({ type: LOGIN, payload: data });
    setAuthority('admin');
    reloadAuthorized();
    dispatch(push('/'));
  } else {
    Message.error(info);
  }
  return status;
};
