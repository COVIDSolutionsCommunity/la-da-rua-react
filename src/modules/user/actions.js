import { defineAction } from 'redux-define'

import * as userService from 'services/user'

const REQUEST = ['PENDING', 'FULFILLED', 'REJECTED', 'COUNT']

export const GET_MUSIC = defineAction('GET_MUSIC', REQUEST)
export const REGISTER_USER = defineAction('REGISTER_USER', REQUEST)

export const registerUser = (payload) => (dispatch) => {
  return dispatch({
    type: REGISTER_USER.ACTION,
    payload: userService.registerUser(payload),
  })
}
