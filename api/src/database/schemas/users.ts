import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { tasksTable } from './tasks'

export const usersTable = pgTable('users', {
  id: uuid().defaultRandom().notNull().primaryKey(),
  username: text('username').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const userRelations = relations(usersTable, ({ many }) => ({
  tasks: many(tasksTable),
}))
