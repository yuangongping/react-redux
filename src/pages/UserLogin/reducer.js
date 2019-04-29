import {
  LOGIN,
} from './actions';

const initaState = {
};

export default (state = initaState, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    default:
      return state;
  }
};
