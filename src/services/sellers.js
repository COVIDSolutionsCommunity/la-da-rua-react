/* eslint-disable comma-dangle */
/* eslint-disable no-param-reassign */

import { get, post } from 'utils/requests'
import { CATEGORIES_NAMES } from 'utils/constants'

export const getSellers = () => get()('sellers/')

export const getSellersCategory = (category, page = null) => {
  const hasPage = page
    ? `sellers/?category=${CATEGORIES_NAMES[category]}&page=${page}`
    : `sellers/?category=${CATEGORIES_NAMES[category]}`
  return get()(hasPage, {
    params: {
      page_size: 50,
      category,
      page,
    },
  })
}

export const getSellersSearch = (category, name) =>
  get()(`sellers/?category=${CATEGORIES_NAMES[category]}$name=${name}`, {
    params: {
      category,
      name,
      page_size: 50,
    },
  })

export const getSeller = (slug) => get()(`sellers/${slug}/`)

export const buySomething = (slug, payload) => post()(`sellers/${slug}/buy/`, payload)
