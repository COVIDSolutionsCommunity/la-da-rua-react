import { REGISTER_USER } from './actions'

export const isRegisterLoading = ({ loading }) => !!loading[REGISTER_USER.ACTION]
export const registerError = ({ error }) => error[REGISTER_USER.ACTION]
