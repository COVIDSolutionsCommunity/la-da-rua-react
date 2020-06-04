/* eslint-disable comma-dangle */
/* eslint-disable no-param-reassign */

import { get, post } from 'utils/requests'
import { CATEGORIES_NAMES } from 'utils/constants'

export const getSellers = () => get()('sellers/')

export const getSellersCategory = (category) =>
  get()(`sellers/?category=${CATEGORIES_NAMES[category]}`, {
    params: {
      category,
      page_size: 50,
    },
  })

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
