import {
  USER_PROFILE,
} from './action';

const initaState = {};

export default (state = initaState, action) => {
  switch (action.type) {
    case USER_PROFILE:
      return action.payload;
    default:
      return state;
  }
};
