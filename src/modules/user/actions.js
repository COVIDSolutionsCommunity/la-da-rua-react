import { defineAction } from 'redux-define'

import * as userService from 'services/user'

const REQUEST = ['PENDING', 'FULFILLED', 'REJECTED', 'COUNT']

export const GET_MUSIC = defineAction('GET_MUSIC', REQUEST)
export const REGISTER_USER = defineAction('REGISTER_USER', REQUEST)
export const LOGIN = defineAction('LOGIN', REQUEST)
export const CREATE_SELLER = defineAction('CREATE_SELLER', REQUEST)
export const GET_SELLER = defineAction('GET_SELLER', REQUEST)
export const UPDATE_SELLER = defineAction('UPDATE_SELLER', REQUEST)

export const registerUser = (payload) => (dispatch) => {
  return dispatch({
    type: REGISTER_USER.ACTION,
    payload: userService.registerUser(payload),
  })
}

export const login = (payload) => (dispatch) => {
  return dispatch({
    type: LOGIN.ACTION,
    payload: userService.login(payload),
  })
}

export const createSeller = (payload) => (dispatch, getState) => {
  return dispatch({
    type: CREATE_SELLER.ACTION,
    payload: userService.createSeller(payload, getState().user.key),
  })
}

export const getSeller = () => (dispatch, getState) => {
  return dispatch({
    type: GET_SELLER.ACTION,
    payload: userService.getSeller(getState().user.key),
  })
}

export const updateSeller = (payload) => (dispatch, getState) => {
  return dispatch({
    type: UPDATE_SELLER.ACTION,
    payload: userService.updateSeller(payload, getState().user.key),
  })
}
