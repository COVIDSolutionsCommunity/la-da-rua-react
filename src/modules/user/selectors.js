import { REGISTER_USER, LOGIN, CREATE_SELLER, UPDATE_SELLER } from './actions'

export const isRegisterLoading = ({ loading }) => !!loading[REGISTER_USER.ACTION]
export const registerError = ({ error }) => error[REGISTER_USER.ACTION]
export const isLoginLoading = ({ loading }) => !!loading[LOGIN.ACTION]
export const loginError = ({ error }) => error[LOGIN.ACTION]
export const isCreatingSeller = ({ loading }) => !!loading[CREATE_SELLER.ACTION]
export const createSellerError = ({ error }) => error[CREATE_SELLER.ACTION]
export const isUpdatingSeller = ({ loading }) => !!loading[UPDATE_SELLER.ACTION]
export const updateError = ({ error }) => error[UPDATE_SELLER.ACTION]

export const getMySeller = (state) => state.user.seller
export const getMyProducts = (state) => state.user.seller.products
