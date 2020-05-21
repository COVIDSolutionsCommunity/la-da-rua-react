import produce from 'immer'
import cookies from 'react-cookies'

import { createReducer } from 'utils/redux'

import { REGISTER_USER } from './actions'

const INITIAL_STATE = {
  key: cookies.load('key'),
  firstName: '',
  lastName: '',
  profileImage: '',
  gender: '',
  username: '',
  pk: '',
}

const user = createReducer(INITIAL_STATE, {
  [REGISTER_USER.FULFILLED]: (state, { payload }) => {
    return produce(state, (previousState) => {
      cookies.save('key', payload.key)
      previousState.key = payload.key
      // eslint-disable-next-line no-return-assign
      Object.keys(payload.user).map((key) => (previousState[key] = payload.user[key]))
    })
  },
})

export default user
