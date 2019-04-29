import { push } from 'react-router-redux';
import { Message } from '@alifd/next';

import {
  lists,
  add,
  viewModel,
  qiyuSDK,
  submitExpDifficulty,
} from '@api/member';
import { reloadAuthorized } from '../../utils/Authorized';

export const ADD = 'ADD';
export const LIST = 'LIST';
export const VIEW_MODEL = 'VIEW_MODEL';
export const LOADING = 'LOADING';
export const QIYU_SDK = 'QIYU_SDK';
export const SET_LEVEL = 'SET_LEVEL';

const overdue = ({ code, info }, dispatch) => {
  dispatch({ type: LOADING, payload: false });
  Message.warning(info);
  if (code === 301) {
    if ('Token' in sessionStorage) {
      sessionStorage.removeItem('Token');
    } else if ('Token' in localStorage) {
      localStorage.removeItem('Token');
    }
    reloadAuthorized();
    dispatch(push('/user/login'));
  }
};

export const memberAdd = (params) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  const { data, status, info, code } = await add(params);
  if (status) {
    Message.success(info);
    dispatch({ type: ADD, payload: data });
    dispatch({ type: LOADING, payload: false });
  } else {
    overdue({ data, info, status, code }, dispatch);
  }
  return { data, info, status };
};

export const memberModel = params => async dispatch => {
  const { data, status, info, code } = await viewModel(params);
  if (status) {
    dispatch({ type: VIEW_MODEL, payload: data });
  } else {
    overdue({ data, info, status, code }, dispatch);
  }
  return { data, info, status };
};

export const setMemberExp_difficulty = (key, record) => async dispatch => {
  if (Number.parseInt(key, 10) === record.exp_difficulty) {
    Message.notice('该学生已经是该级别了');
  } else {
    dispatch({ type: LOADING, payload: true });
    const { data, status, info, code } = await submitExpDifficulty({ sid: record.sid, exp_difficulty: Number.parseInt(key, 10) });
    dispatch({ type: LOADING, payload: false });
    if (status) {
      dispatch({ type: SET_LEVEL, payload: { ...record, exp_difficulty: Number.parseInt(key, 10) } });
    } else {
      overdue({ data, info, status, code }, dispatch);
    }
    return { data, info, status };
  }
};

export const memberList = (params) => async dispatch => {
  dispatch({ type: LOADING, payload: true });
  const { data, info, status, code } = await lists(params);
  if (status) {
    dispatch({ type: LIST, payload: data });
    dispatch({ type: LOADING, payload: false });
  } else {
    overdue({ data, info, status, code }, dispatch);
  }
  return { data, info, status };
};

export const getSDK = () => async dispatch => {
  const { data, info, status } = await qiyuSDK();
  if (status) {
    if (data.sdk_url) {
      const sdk = document.createElement('script');
      sdk.async = !0;
      sdk.src = data.sdk_url;
      sdk.onload = () => {
        window.qiConnect.on({
          onload() {
            console.log('工具条加载完毕!');
          },
        });
      };
      document.body.appendChild(sdk);
    }
    dispatch({ type: QIYU_SDK, payload: data.sdk_url });
  } else {
    Message.warning(info);
  }
  return { data, info, status };
};
