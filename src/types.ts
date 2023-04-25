import { z } from 'zod'

const todoSchema = z.object({
  id: z.string(),
  label: z.string(),
  checked: z.boolean(),
  createdAt: z.coerce.date(),
  completedAt: z.coerce.date().nullable(),
})

export const todosSchema = z.array(todoSchema)

export type Todo = z.infer<typeof todoSchema>
