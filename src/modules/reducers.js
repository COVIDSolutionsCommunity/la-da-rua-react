import { combineReducers } from 'redux'

import user from './user/reducers'
import loading from './loading/reducers'
import error from './error/reducers'
import sellers from './sellers/reducers'

const appReducer = combineReducers({
  loading,
  error,
  user,
  sellers,
})

const rootReducer = (state, action) => appReducer(state, action)

export default rootReducer
