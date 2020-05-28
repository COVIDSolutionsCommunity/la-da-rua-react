import { defineAction } from 'redux-define'

import * as sellersServices from 'services/sellers'

const REQUEST = ['PENDING', 'FULFILLED', 'REJECTED', 'COUNT']

export const GET_SELLERS_CATEGORY = defineAction('GET_SELLERS_CATEGORY', REQUEST)
export const GET_SELLERS_SEARCH = defineAction('GET_SELLERS_SEARCH', REQUEST)
export const GET_CURRENT_SELLER = defineAction('GET_CURRENT_SELLER', REQUEST)

export const getSellersCategory = (category) => (dispatch) => {
  return dispatch({
    type: GET_SELLERS_CATEGORY.ACTION,
    payload: sellersServices.getSellersCategory(category),
  })
}

export const getSellersSearch = (category, value) => (dispatch) => {
  return dispatch({
    type: GET_SELLERS_SEARCH.ACTION,
    payload: sellersServices.getSellersSearch(category, value),
  })
}

export const getSeller = (slug) => (dispatch) => {
  return dispatch({
    type: GET_CURRENT_SELLER.ACTION,
    payload: sellersServices.getSeller(slug),
  })
}
