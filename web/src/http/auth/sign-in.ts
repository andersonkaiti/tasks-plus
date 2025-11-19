import { api } from '../api-client'

interface ISignInRequest {
  email: string
  password: string
}

interface ISignInResponse {
  token: string
}

export async function signIn(user: ISignInRequest): Promise<ISignInResponse> {
  return await api
    .post('sign-in', {
      json: user,
    })
    .json()
}
