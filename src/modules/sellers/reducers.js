/* eslint-disable no-shadow */
import produce from 'immer'

import { createReducer } from 'utils/redux'

import { GET_SELLERS_CATEGORY, GET_SELLERS_SEARCH, GET_CURRENT_SELLER } from './actions'

const INITIAL_STATE = {
  result: '',
  next: '',
  currentSeller: {},
}

export const getPage = (query) =>
  query.includes('?page=') || query.includes('&page=')
    ? Number(query.match(/[?&]page=([^&#]*)/)[1])
    : undefined

const getProductPage = (page) => (page ? getPage(page) : undefined)

const returnNewProducts = (previousState, payload) => {
  const products = payload.results

  const newProducts = payload.next ? [...previousState.seller.products, products] : products

  previousState.result = newProducts
  previousState.next = getProductPage(payload.new)
  previousState.previous = payload.previous
}

const sellers = createReducer(INITIAL_STATE, {
  [GET_SELLERS_CATEGORY.FULFILLED]: (state, { payload }) => {
    return produce(state, (previousState) => {
      returnNewProducts(previousState, payload)
    })
  },
  [GET_SELLERS_SEARCH.FULFILLED]: (state, { payload }) => {
    return produce(state, (previousState) => {
      returnNewProducts(previousState, payload)
    })
  },
  [GET_CURRENT_SELLER.FULFILLED]: (state, { payload }) => {
    return produce(state, (previousState) => {
      previousState.currentSeller = payload
    })
  },
})

export default sellers
