/* eslint-disable no-shadow */
import produce from 'immer'
import cookies from 'react-cookies'

import { createReducer } from 'utils/redux'

import {
  REGISTER_USER,
  LOGIN,
  CREATE_SELLER,
  GET_SELLER,
  UPDATE_SELLER,
  CREATE_PRODUCT,
  GET_PRODUCTS,
  UPDATE_PRODUCT,
  LOGOUT,
  UPDATE_USER,
  GET_USER,
  DELETE_PRODUCT,
} from './actions'

const INITIAL_STATE = {
  key: cookies.load('key'),
  firstName: '',
  lastName: '',
  profileImage: '',
  gender: '',
  username: '',
  pk: '',
  seller: {
    name: '',
    description: '',
    neighborhood: '',
    telephoneNumber: '',
    city: '',
    state: '',
    category: '',
    isApproved: false,
    products: [],
    slug: '',
  },
}

const setObjectKeys = (previousState, value) =>
  // eslint-disable-next-line no-return-assign
  Object.keys(value).map((key) => (previousState[key] = value[key]))

export const getPage = (query) =>
  query.includes('?page=') || query.includes('&page=')
    ? Number(query.match(/[?&]page=([^&#]*)/)[1])
    : undefined

const getProductPage = (page) => (page ? getPage(page) : undefined)

const returnNewProducts = (previousState, payload) => {
  const products = payload.results

  const newProducts = payload.next ? [...previousState.seller.products, products] : products

  previousState.seller.products = newProducts
  previousState.seller.next = getProductPage(payload.new)
  previousState.seller.previous = payload.previous
}

const user = createReducer(INITIAL_STATE, {
  [REGISTER_USER.FULFILLED]: (state, { payload }) => {
    return produce(state, (previousState) => {
      cookies.save('key', payload.key)
      previousState.key = payload.key
      setObjectKeys(previousState, payload)
    })
  },
  [GET_USER.FULFILLED]: (state, { payload }) => {
    return produce(state, (previousState) => {
      previousState.key = state.key
      setObjectKeys(previousState, payload)
    })
  },
  [LOGIN.FULFILLED]: (state, { payload }) => {
    return produce(state, (previousState) => {
      cookies.save('key', payload.key)
      previousState.key = payload.key
      setObjectKeys(previousState, payload.user)
    })
  },
  [UPDATE_USER.FULFILLED]: (state, { payload }) => {
    return produce(state, (previousState) => {
      setObjectKeys(previousState, payload)
    })
  },
  [CREATE_SELLER.FULFILLED]: (state, { payload }) => {
    return produce(state, (previousState) => {
      const { user, ...values } = payload
      setObjectKeys(previousState, payload.user)
      setObjectKeys(previousState.seller, values)
    })
  },
  [UPDATE_SELLER.FULFILLED]: (state, { payload }) => {
    return produce(state, (previousState) => {
      const { user, ...values } = payload
      setObjectKeys(previousState, payload.user)
      setObjectKeys(previousState.seller, values)
    })
  },
  [GET_SELLER.FULFILLED]: (state, { payload }) => {
    return produce(state, (previousState) => {
      const { user, ...values } = payload
      setObjectKeys(previousState, payload.user)
      setObjectKeys(previousState.seller, values)
    })
  },
  [DELETE_PRODUCT.FULFILLED]: (state, { meta }) => {
    const newProducts = state.seller.products.filter((product) => product.id !== meta.id)
    return produce(state, (previousState) => {
      previousState.seller.products = newProducts
    })
  },
  [CREATE_PRODUCT.FULFILLED]: (state, { payload }) => {
    return produce(state, (previousState) => {
      previousState.seller.products = [...previousState.seller.products, payload]
    })
  },
  [GET_PRODUCTS.FULFILLED]: (state, { payload }) => {
    return produce(state, (previousState) => {
      returnNewProducts(previousState, payload)
    })
  },
  [UPDATE_PRODUCT.FULFILLED]: (state, { payload }) => {
    return produce(state, (previousState) => {
      const { id } = payload
      const newValues = previousState.seller.products.map((value) =>
        value.id === id ? payload : value
      )
      previousState.seller.products = newValues
    })
  },
  [LOGOUT]: (state) => {
    return produce(state, (previousState) => {
      cookies.remove('key')
      previousState.key = ''
    })
  },
})

export default user
