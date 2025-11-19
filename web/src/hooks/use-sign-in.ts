import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from '@http/auth/sign-in'
import Cookies from 'js-cookie'
import { HTTPError } from 'ky'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

const signInSchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter ao menos 6 caracteres'),
})

type SignInSchema = z.infer<typeof signInSchema>

export function useSignIn() {
  const [serverError, setServerError] = useState<null | string>(null)

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    values: {
      email: '',
      password: '',
    },
  })

  const handleSubmit = form.handleSubmit(async (values: SignInSchema) => {
    try {
      const { token } = await signIn(values)

      toast.success('Login realizado com sucesso!')

      Cookies.set('token', token)
    } catch (err) {
      if (err instanceof HTTPError) {
        const errorBody = await err.response.json()
        setServerError(errorBody)
      }
    }
  })

  return {
    form,
    serverError,
    handleSubmit,
  }
}
