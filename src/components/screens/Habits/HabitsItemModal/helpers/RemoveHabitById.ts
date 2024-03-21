import { IHabit } from "../../../../../models/UploadData/IHabit";

export const removeHabitById = (habits: IHabit[], id: number) => {
  const index = habits.findIndex(habit => id === habit.id)
  if (index !== -1){
    habits.splice(index, 1)
  }
  return habits
}