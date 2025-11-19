import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert'
import { Button } from '@components/ui/button'
import CalendarTimePicker from '@components/ui/calendar-time-picker'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'
import { Input } from '@components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select'
import { Separator } from '@components/ui/separator'
import { Textarea } from '@components/ui/textarea'
import { useUpdateTask } from '@hooks/use-update-task'
import { createFileRoute } from '@tanstack/react-router'
import { AlertCircleIcon } from 'lucide-react'

export const Route = createFileRoute('/dashboard/tasks/update/$id')({
  component: RouteComponent,
  loader: ({ params: { id } }) => ({
    id,
  }),
})

function RouteComponent() {
  const { handleSubmit, serverError, form } = useUpdateTask()

  return (
    <div className="flex items-center justify-center sm:p-10 p-4">
      <div className="w-full">
        <h3 className="text-lg font-semibold text-foreground">Editar tarefa</h3>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Altere os campos abaixo para atualizar esta tarefa.
        </p>

        <Form {...form}>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {serverError && (
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>Erro ao atualizar tarefa</AlertTitle>
                <AlertDescription>
                  <p>{serverError}</p>
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel className="font-medium">
                      Título da tarefa<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        required
                        placeholder="Ex.: Preparar relatório semanal"
                        className="mt-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel className="font-medium" htmlFor="description">
                      Descrição<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        id="description"
                        placeholder="Informe detalhes relevantes da tarefa..."
                        required
                        className="mt-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="col-span-full sm:col-span-3">
                    <FormLabel className="font-medium" htmlFor="deadline">
                      Prazo
                    </FormLabel>
                    <FormControl>
                      <CalendarTimePicker
                        {...field}
                        dateLabel=""
                        timeLabel=""
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="completed"
                render={({ field }) => (
                  <FormItem className="col-span-full sm:col-span-3">
                    <FormLabel className="font-medium" htmlFor="completed">
                      Finalizado
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value ? String(field.value) : 'false'}
                        onValueChange={(val) => field.onChange(val === 'true')}
                        name="completed"
                      >
                        <SelectTrigger id="completed" className="mt-2">
                          <SelectValue placeholder="Finalizado?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Sim</SelectItem>
                          <SelectItem value="false">Não</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator className="my-6" />

            <div className="flex items-center justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                className="whitespace-nowrap"
                onClick={() => window.history.back()}
              >
                Voltar
              </Button>
              <Button type="submit" className="whitespace-nowrap">
                Salvar alterações
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
