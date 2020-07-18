/* eslint-disable no-shadow */
import produce from 'immer'

import { createReducer } from 'utils/redux'

import { GET_SELLERS_CATEGORY, GET_SELLERS_SEARCH, GET_CURRENT_SELLER } from './actions'

const initialCategoryState = {
  count: '',
  result: [],
  next: '',
}

const INITIAL_STATE = {
  currentSeller: {},
  food: initialCategoryState,
  misc: initialCategoryState,
  services: initialCategoryState,
  decoration: initialCategoryState,
  clothing: initialCategoryState,
}

export const getPage = (query) =>
  query.includes('?page=') || query.includes('&page=')
    ? Number(query.match(/[?&]page=([^&#]*)/)[1])
    : undefined

const getProductPage = (page) => (page ? getPage(page) : undefined)

const returnNewProducts = (previousState, state, payload) => {
  const products = payload.results
  const newProducts = state[products[0].category].result.length
    ? [...state[products[0].category].result, ...products]
    : products

  previousState[products[0].category] = {
    result: newProducts,
    count: payload.count,
    next: getProductPage(payload.next),
  }
}

const sellers = createReducer(INITIAL_STATE, {
  [GET_SELLERS_CATEGORY.FULFILLED]: (state, { payload }) => {
    return produce(state, (previousState) => {
      returnNewProducts(previousState, state, payload)
    })
  },
  [GET_SELLERS_SEARCH.FULFILLED]: (state, { payload }) => {
    return produce(state, (previousState) => {
      previousState.result = payload.results
      previousState.count = payload.count
    })
  },
  [GET_CURRENT_SELLER.FULFILLED]: (state, { payload }) => {
    return produce(state, (previousState) => {
      previousState.currentSeller = payload
    })
  },
})

export default sellers
