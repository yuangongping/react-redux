import qs from 'qs';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  try{
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }catch (e) {
    console.log('sssssssssssssss');
  }
  
}

const options = {
  mode: 'cors',
  credentials: 'include',
};

/**
  * @desc get请求序列化
  */
const searchParams = query =>
  ((typeof query === 'object')
    ? `?${new URLSearchParams(query).toString()}`
    : '');
/* eslint-disable */
const base = process.env.NODE_ENV === 'development'
            ? 'http://localhost:5000/'
            : RELEASE
              ? 'http://localhost:5000/'
              : 'http://localhost:5000/';


/**
 * Requests a URL, returning a promise.
 */
export default {
  get: (url, params, option) =>
    fetch(`${base}${url}${searchParams({ ...params, token: sessionStorage.Token || localStorage.Token })}`, {
      ...options,
      ...option,
    }).then(res => res.json()).catch(checkStatus),
  post: (url, body, option) =>
    fetch(`${base}${url}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      ...options,
      ...option,
      method: 'POST',
      body: qs.stringify(body),
    }).then(res => res.json()).catch(checkStatus),
  auth: (url, body, option) =>
    fetch(`${base}${url}${searchParams({ token: sessionStorage.Token || localStorage.Token })}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      ...options,
      ...option,
      method: 'POST',
      body: qs.stringify(body),
    }).then(res => res.json()).catch(checkStatus),
};
