import {
  ADD,
  LIST,
  VIEW_MODEL,
  QIYU_SDK,
  LOADING,
  SET_LEVEL,
} from './actions';

const initaState = {
  model: [],
  list: [],
  total: 0,
  loading: false,
};

export default (state = initaState, action) => {
  switch (action.type) {
    case ADD:
      return { ...state };
    case LIST:
      const { list, total } = action.payload;
      return {
        ...state,
        list,
        total,
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_LEVEL:
      state.list.splice(state.list.findIndex(({ sid }) => sid === action.payload.sid), 1, action.payload);
      return {
        ...state,
      };
    case VIEW_MODEL:
      // TODO viewModel并不需要被后端管理. 如果需要得重新封装
      return {
        ...state,
      };
    case QIYU_SDK:
      return state;
    default:
      return state;
  }
};
