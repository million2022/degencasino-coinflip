import {
  GET_USER,
  UPDATE_USER,
} from '../actions/types';

const initialState = {
  user: null,
  loading: true,
  error: {}
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER:
    case UPDATE_USER:
      return {
        ...state,
        user: payload,
        loading: false
      };
    default:
      return state;
  }
}

export default userReducer;
