import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert'
import { Button } from '@components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'
import { Input } from '@components/ui/input'
import { useSignIn } from '@hooks/use-sign-in'
import { createFileRoute, Link } from '@tanstack/react-router'
import { AlertCircleIcon } from 'lucide-react'

export const Route = createFileRoute('/auth/sign-in')({
  component: SignInPage,
})

function SignInPage() {
  const { handleSubmit, serverError, form } = useSignIn()

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-1 flex-col justify-center px-4 py-10 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h3 className="text-center text-lg font-semibold text-foreground dark:text-foreground">
            Faça login na sua conta
          </h3>
          <p className="text-center text-sm text-muted-foreground dark:text-muted-foreground">
            Digite seu e-mail e senha para acessar.
          </p>

          <Form {...form}>
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              {serverError && (
                <Alert variant="destructive">
                  <AlertCircleIcon />
                  <AlertTitle>Erro ao fazer login</AlertTitle>
                  <AlertDescription>
                    <p>{serverError}</p>
                  </AlertDescription>
                </Alert>
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground dark:text-foreground">
                      E-mail
                    </FormLabel>
                    <FormControl>
                      <Input type="email" autoComplete="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground dark:text-foreground">
                      Senha
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="mt-4 w-full py-2 font-medium">
                Entrar
              </Button>
            </form>
          </Form>

          <p className="mt-6 text-sm text-muted-foreground dark:text-muted-foreground">
            Não possui uma conta?{' '}
            <Link
              to="/auth/sign-up"
              className="font-medium text-primary hover:text-primary/90 dark:text-primary dark:hover:text-primary/90"
            >
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
