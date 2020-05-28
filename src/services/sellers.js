/* eslint-disable comma-dangle */
/* eslint-disable no-param-reassign */

import { get } from 'utils/requests'

export const getSellers = () => get()('sellers/')

export const getSellersCategory = (category) =>
  get()('sellers/', {
    params: {
      category,
      page_size: 50,
    },
  })

export const getSeller = (slug) => get()(`sellers/${slug}`)
