import { client, db } from '.'
import { goalCompletions, goals, users } from './schema'
import dayjs from 'dayjs'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)
  await db.delete(users)

  const insertedUser = await db
    .insert(users)
    .values(
      { username: 'teste', email: 'teste@teste.com', password: 'teste' }
    )
    .returning()

  const insertedGoals = await db
    .insert(goals)
    .values([
      { title: 'Acordar cedo', desiredWeeklyFrequency: 5, userId: insertedUser[0].id },
      { title: 'Me exercitar', desiredWeeklyFrequency: 3, userId: insertedUser[0].id },
      { title: 'Meditar', desiredWeeklyFrequency: 1, userId: insertedUser[0].id },
    ])
    .returning()

  const startOfWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    { goalId: insertedGoals[0].id, createdAt: startOfWeek.toDate() },
    { goalId: insertedGoals[1].id, createdAt: startOfWeek.add(1, 'day').toDate() },
  ])
}

seed().finally(() => {
  client.end()
})
