/* eslint-disable comma-dangle */
/* eslint-disable no-param-reassign */
import humps from 'humps'

import { get, post, patch, createFormData } from 'utils/requests'

export const registerUser = (payload) => {
  const newPayload = humps.decamelizeKeys(payload)
  return post()(
    'register/',
    createFormData({ ...newPayload, profile_image: payload.profileImage }),
    false
  )
}

export const createSeller = (payload, key) => {
  const newPayload = humps.decamelizeKeys(payload)
  return post(key)(
    'my-seller/',
    createFormData({ ...newPayload, cover_image: payload.profileImage }),
    false
  )
}

export const updateSeller = (payload, key) => {
  const { profileImage, ...newPayload } = humps.decamelizeKeys(payload)
  if (payload?.coverImage) {
    return patch(key)(
      'my-seller/',
      createFormData({ ...humps.decamelizeKeys(newPayload), cover_image: payload.profileImage }),
      false
    )
  }
  return patch(key)('my-seller/', payload)
}

export const getSeller = (key) => get(key)('my-seller/')

export const login = (payload) => post()('login/', payload)

export const getProducts = (key) => get(key)('my-products/')
