import { env } from '@config/env'
import Cookies from 'js-cookie'
import ky from 'ky'

export const api = ky.create({
  prefixUrl: env.VITE_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        const token = Cookies.get('token')

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})
