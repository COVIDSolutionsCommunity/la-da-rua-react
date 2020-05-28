import axios from 'axios'
import humps from 'humps'

const api = 'https://api-ladarua.herokuapp.com/api/v1/'

const handleResponseError = (error) => new Promise((resolve, reject) => reject(error.response.data))

export const createFormData = (data) => {
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

export const get = (key = null) => (endpoint, params = null) =>
  axios
    .get(
      api.concat(endpoint),
      key && {
        headers: {
          Authorization: `Token ${key}`,
        },
      },
      params
    )
    .then(({ data }) => humps.camelizeKeys(data))
    .catch(handleResponseError)

export const post = (key = null) => (endpoint, payload, applyHumps = true) =>
  axios
    .post(
      api.concat(endpoint),
      applyHumps ? humps.decamelizeKeys(payload) : payload,
      key && {
        headers: {
          Authorization: `Token ${key}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    .then(({ data }) => humps.camelizeKeys(data))
    .catch(handleResponseError)

export const patch = (key) => (endpoint, payload, applyHumps = true) =>
  axios
    .patch(
      api.concat(endpoint),
      applyHumps ? humps.decamelizeKeys(payload) : payload,
      key && {
        headers: {
          Authorization: `Token ${key}`,
        },
      }
    )
    .then(({ data }) => humps.camelizeKeys(data))
    .catch(handleResponseError)

export const del = (key) => (endpoint) =>
  axios
    .delete(
      api.concat(endpoint),
      key && {
        headers: {
          Authorization: `Token ${key}`,
        },
      }
    )
    .then(({ data }) => humps.camelizeKeys(data))
    .catch(handleResponseError)