/* eslint-disable no-shadow */
import produce from 'immer'

import { createReducer } from 'utils/redux'

import { GET_SELLERS_CATEGORY, GET_SELLERS_SEARCH, GET_CURRENT_SELLER } from './actions'

const INITIAL_STATE = {
  result: [],
  next: '',
  currentSeller: {},
  count: '',
}

export const getPage = (query) =>
  query.includes('?page=') || query.includes('&page=')
    ? Number(query.match(/[?&]page=([^&#]*)/)[1])
    : undefined

const getProductPage = (page) => (page ? getPage(page) : undefined)

const returnNewProducts = (previousState, state, payload) => {
  const products = payload.results
  const newProducts = state.result.length ? [...state?.result, ...products] : products

  previousState.result = newProducts
  previousState.count = payload.count
  previousState.next = getProductPage(payload.next)
  previousState.previous = payload.previous
}

const sellers = createReducer(INITIAL_STATE, {
  [GET_SELLERS_CATEGORY.FULFILLED]: (state, { payload }) => {
    return produce(state, (previousState) => {
      returnNewProducts(previousState, state, payload)
    })
  },
  [GET_SELLERS_SEARCH.FULFILLED]: (state, { payload }) => {
    return produce(state, (previousState) => {
      returnNewProducts(previousState, state, payload)
    })
  },
  [GET_CURRENT_SELLER.FULFILLED]: (state, { payload }) => {
    return produce(state, (previousState) => {
      previousState.currentSeller = payload
    })
  },
})

export default sellers
