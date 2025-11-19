import { relations } from 'drizzle-orm'
import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { usersTable } from './users'

export const tasksTable = pgTable('tasks', {
  id: uuid().defaultRandom().notNull().primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  authorId: uuid('author_id')
    .notNull()
    .references(() => usersTable.id),
  completed: boolean('completed').notNull().default(false),
  dueDate: timestamp('due_date'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const taskRelations = relations(tasksTable, ({ one }) => ({
  author: one(usersTable, {
    fields: [tasksTable.authorId],
    references: [usersTable.id],
  }),
}))
