import { IHabit } from "@/models/UploadData/IHabit";

export const getMaxHabitId = (habits: IHabit[]) => {
  let maxId = 0
  habits.forEach((habit) => {
    maxId = (habit.id > maxId ? habit.id : maxId)
  })
  return maxId
}