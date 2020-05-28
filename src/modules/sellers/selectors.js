import { GET_SELLERS_CATEGORY } from './actions'

export const isRegisterLoading = ({ loading }) => !!loading[GET_SELLERS_CATEGORY.ACTION]
export const registerError = ({ error }) => error[GET_SELLERS_CATEGORY.ACTION]

export const getSellers = (state) => state.sellers.result
export const currentSeller = (state) => state.sellers.currentSeller
