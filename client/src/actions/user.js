import axios from 'axios'
import {
  GET_USER,
  UPDATE_USER,
} from './types';

export const manageUser = (address, data) => async (dispatch) => {
  let result = await axios.post(`/api/user/manage/${address}`, data)

  dispatch({
    type: UPDATE_USER,
    payload: result.data
  });
};

export const getUser = (address) => async (dispatch) => {
  let result = await axios.post('/api/user/get', address)

  dispatch({
    type: GET_USER,
    payload: result.data
  });
};