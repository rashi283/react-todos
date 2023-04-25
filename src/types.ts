import { z } from 'zod'

const todoSchema = z.object({
  id: z.string(),
  label: z.string(),
  checked: z.boolean(),
  createdAt: z.string().datetime(),
  completedAt: z.string().datetime().nullable(),
})

export const todosSchema = z.array(todoSchema)

export type Todo = z.infer<typeof todoSchema>
