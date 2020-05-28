import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from '@reach/router'

import { isLoggedIn } from 'modules/user/selectors'

const authRoute = (WrappedComponent) => {
  const AuthRoute = ({ ...props }) => {
    const key = useSelector(isLoggedIn)
    if (!key) {
      return <Redirect to="/login" noThrow />
    }

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <WrappedComponent {...props} />
  }
  return AuthRoute
}

export default authRoute
