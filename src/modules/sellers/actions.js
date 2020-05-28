import { defineAction } from 'redux-define'

import * as sellersServices from 'services/sellers'

const REQUEST = ['PENDING', 'FULFILLED', 'REJECTED', 'COUNT']

export const GET_SELLERS_CATEGORY = defineAction('GET_SELLERS_CATEGORY', REQUEST)

export const getSellersCategory = (category) => (dispatch) => {
  return dispatch({
    type: GET_SELLERS_CATEGORY.ACTION,
    payload: sellersServices.getSellersCategory(category),
  })
}
