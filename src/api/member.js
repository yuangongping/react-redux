import request from '../utils/request';

export const lists = params =>
  request.get('/Outsource/Student/lists', params);

export const add = params =>
  request.auth('/Outsource/Student/add', params);

export const viewModel = params =>
  request.get('/Outsource/Student/viewModel', params);

export const qiyuSDK = () =>
  request.get('/Outsource/Index/getCallToolbar');

export const submitExpDifficulty = params =>
  request.auth('/Outsource/Student/submitExpDifficulty', params);
