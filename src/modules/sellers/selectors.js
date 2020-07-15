import { createSelector } from 'reselect'

import { GET_SELLERS_CATEGORY, BUY_SOMETHING } from './actions'

export const isRegisterLoading = ({ loading }) => !!loading[GET_SELLERS_CATEGORY.ACTION]
export const registerError = ({ error }) => error[GET_SELLERS_CATEGORY.ACTION]

export const isBuying = ({ loading }) => !!loading[BUY_SOMETHING.ACTION]

export const getSellers = (state) => state.sellers.result
const getParam = (state, param) => param
export const currentSeller = (state) => state.sellers.currentSeller
export const getCount = (state) => state.sellers.count
export const currentSellerProducts = (state) => state.sellers.currentSeller.products

export const getCurrentProduct = createSelector([currentSellerProducts, getParam], (products, id) =>
  products?.find((product) => Number(id) === product.id)
)
