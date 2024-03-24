import { ISortedHabits } from '@/interfaces/interfaces'
import { IHabit } from '@/models/UploadData/IHabit'

export const sortHabits = (habits: IHabit[], currentDate: string): ISortedHabits => {
  const sortedHabits: ISortedHabits = {
    monthlyHabits: [],
    weeklyHabits: [],
    dailyHabits: []
  }
  if (habits === undefined) return sortedHabits

  habits.forEach((habitItem) => {
    if (
      (!habitItem.stoppedDate || new Date(currentDate) <= new Date(habitItem.stoppedDate)) &&
      new Date(currentDate) >= new Date(habitItem.addDate)
    ) {
      if (habitItem.period === 'monthly') {
        sortedHabits.monthlyHabits.push(habitItem)
      } else if (habitItem.period === 'weekly') {
        sortedHabits.weeklyHabits.push(habitItem)
      } else if (habitItem.period === 'daily') {
        sortedHabits.dailyHabits.push(habitItem)
      }
    }
  })

  sortedHabits.monthlyHabits.sort((a, b) => new Date(b.addDate).getTime() - new Date(a.addDate).getTime())
  sortedHabits.weeklyHabits.sort((a, b) => new Date(b.addDate).getTime() - new Date(a.addDate).getTime())
  sortedHabits.dailyHabits.sort((a, b) => new Date(b.addDate).getTime() - new Date(a.addDate).getTime())

  return sortedHabits
}
