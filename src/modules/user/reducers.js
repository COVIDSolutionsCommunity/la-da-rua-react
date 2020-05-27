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
      setObjectKeys(previousState, payload.user)
    })
  },
  [LOGIN.FULFILLED]: (state, { payload }) => {
    return produce(state, (previousState) => {
      cookies.save('key', payload.key)
      previousState.key = payload.key
      setObjectKeys(previousState, payload.user)
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
})

export default user
