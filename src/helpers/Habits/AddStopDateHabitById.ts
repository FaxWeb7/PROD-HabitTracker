import { IHabit } from "../../models/UploadData/IHabit";

export const addStopDateHabitById = (habits: IHabit[], id: number, currentDate: string) => {
  const index = habits.findIndex(habit => id === habit.id)
  const prevHabit = habits[index]
  if (index !== -1){
    habits.splice(index, 1)
  }
  habits.push({...prevHabit, stoppedDate: currentDate})
  return habits
}