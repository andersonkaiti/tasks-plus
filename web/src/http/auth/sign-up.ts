import { api } from '../api-client'

interface ISignUpRequest {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export async function signUp(user: ISignUpRequest) {
  await api.post('sign-up', {
    json: user,
  })
}
