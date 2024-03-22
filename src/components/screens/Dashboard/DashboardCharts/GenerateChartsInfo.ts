import { IHabit } from "../../../../models/UploadData/IHabit"
import { IHabitAction } from "../../../../models/UploadData/IHabitAction"
import { IChartItem } from "../../../../interfaces/interfaces"
import { dateWithoutTime } from "../../../../helpers/ChangeDateFormat"

export const generateCompletedHabitsInfo = (actions: IHabitAction[]): IChartItem => {
  if (!actions.length) return {axisX: [1], axisY: [0]}
  actions.sort((a, b) => {
    return Number(new Date(a.date)) - Number(new Date(b.date))
  })
  const completedHabitsY: number[] = []
  let currentDate = actions[0].date
  let count = 0
  actions.forEach((action, index) => {
    if (dateWithoutTime(action.date) === dateWithoutTime(currentDate)) {
      count++
    } else {
      const diff = ((Number(new Date(action.date)) - Number(new Date(currentDate))) / (1000 * 60 * 60 * 24))
      completedHabitsY.push(count)
      count = 1
      currentDate = action.date
      
      if (diff >= 2){
        for (let i = 0; i < Math.floor(diff-1); i++){
          completedHabitsY.push(0)
        }
      }
    }
    if (index === actions.length - 1) {
      completedHabitsY.push(count)
    }
  })
  const completedHabitsX: number[] = []
  for (let i = 0; i < completedHabitsY.length; i++){
    completedHabitsX.push(i+1)
  }
  return {axisX: completedHabitsX, axisY: completedHabitsY}
}


export const generateAddedHabitsInfo = (habits: IHabit[]): IChartItem => {
  if (!habits.length) return {axisX: [1], axisY: [0]}
  habits.sort((a, b) => {
    return Number(new Date(a.addDate)) - Number(new Date(b.addDate))
  })
  const addedHabitsY: number[] = []
  let currentDate = habits[0].addDate
  let count = 0
  habits.forEach((habit, index) => {
    if (dateWithoutTime(habit.addDate) === dateWithoutTime(currentDate)) {
      count++
    } else {
      const diff = ((Number(new Date(habit.addDate)) - Number(new Date(currentDate))) / (1000 * 60 * 60 * 24))
      addedHabitsY.push(count)
      count = 1
      currentDate = habit.addDate
      
      if (diff >= 2){
        for (let i = 0; i < Math.floor(diff-1); i++){
          addedHabitsY.push(0)
        }
      }
    }
    if (index === habits.length - 1) {
      addedHabitsY.push(count)
    }
  })
  const addedHabitsX: number[] = []
  for (let i = 0; i < addedHabitsY.length; i++){
    addedHabitsX.push(i+1)
  }
  return {axisX: addedHabitsX, axisY: addedHabitsY}
}