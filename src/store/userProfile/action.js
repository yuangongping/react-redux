import { push } from 'react-router-redux';
import { Message } from '@alifd/next';

import { getUserProfile } from '../../api/user';
import { reloadAuthorized } from '../../utils/Authorized';

export const USER_PROFILE = 'USER_PROFILE';

const overdue = (dispatch, { code, info }) => {
  Message.warning(info);
  if (!code || code === 301) {
    if ('Token' in sessionStorage) {
      sessionStorage.removeItem('Token');
    } else if ('Token' in localStorage) {
      localStorage.removeItem('Token');
    }
    reloadAuthorized();
    dispatch(push('/user/login'));
  }
};

export const userProfile = () => async dispatch => {
  if ('Token' in sessionStorage || 'Token' in localStorage) {
    const s = await getUserProfile();
    console.log('111',s);
    const { data, status, info, code } = await getUserProfile();
    if (status) {
      dispatch({ type: USER_PROFILE, payload: data });
    } else {
      overdue(dispatch, { data, info, status, code });
    }
  } else {
    dispatch(push('/user/login'));
  }
};
