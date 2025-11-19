import { zodResolver } from '@hookform/resolvers/zod'
import { signUp } from '@http/auth/sign-up'
import { HTTPError } from 'ky'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

const signUpSchema = z
  .object({
    username: z.string().min(1, 'Nome de usuário é obrigatório'),
    email: z.email('E-mail inválido'),
    password: z.string().min(6, 'A senha deve ter ao menos 6 caracteres'),
    confirmPassword: z
      .string()
      .min(6, 'A confirmação da senha deve ter ao menos 6 caracteres'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type SignUpSchema = z.infer<typeof signUpSchema>

export function useSignUp() {
  const [serverError, setServerError] = useState<null | string>(null)

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    values: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const handleSubmit = form.handleSubmit(async (values: SignUpSchema) => {
    try {
      await signUp(values)

      toast.success('Usuário cadastrado com sucesso!')
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
