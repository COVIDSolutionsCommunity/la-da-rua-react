/* eslint-disable comma-dangle */
/* eslint-disable no-param-reassign */
import axios from 'axios'
import humps from 'humps'

const api = 'https://api-ladarua.herokuapp.com/api/v1/'

const handleResponseError = (error) => new Promise((resolve, reject) => reject(error.response.data))

const createFormData = (data) => {
  const formData = new FormData()

  Object.keys(data).forEach((field) => {
    const fieldValue = data[field]
    const formDataValue = (() => {
      if (!fieldValue) {
        return ''
      }

      if (
        fieldValue instanceof Blob ||
        typeof fieldValue !== 'object' ||
        Array.isArray(fieldValue)
      ) {
        return fieldValue
      }
      return JSON.stringify(fieldValue)
    })()

    if (Array.isArray(formDataValue)) {
      return formDataValue.forEach((value) => {
        formData.append(field, value)
      })
    }

    return formData.append(field, formDataValue)
  })

  return formData
}

// eslint-disable-next-line no-unused-vars
const get = (endpoint) =>
  axios
    .get(api.concat(endpoint))
    .then(({ data }) => humps.camelizeKeys(data))
    .catch(handleResponseError)

const post = () => (endpoint, payload) =>
  axios.post(api.concat(endpoint), payload).then(({ data }) => humps.camelizeKeys(data))
// .catch(handleResponseError)

export const registerUser = (payload) => {
  const newPayload = humps.decamelizeKeys(payload)
  return post()('register/', createFormData({ ...newPayload, profile_image: payload.profileImage }))
}
