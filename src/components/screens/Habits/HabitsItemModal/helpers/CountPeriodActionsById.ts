import { IHabitHelper } from "@/interfaces/interfaces";

export const countPeriodActionsById = ({actions, habit, currentDate, period}: IHabitHelper)  => {
  const curDate = new Date(currentDate)
  let nextPeriodAction = new Date(habit.addDate)
  while (nextPeriodAction <= curDate){
    nextPeriodAction = new Date(nextPeriodAction.getTime() + period * 24 * 60 * 60 * 1000)
  }
  const prevPeriodDate = new Date(nextPeriodAction.getTime() - period * 24 * 60 * 60 * 1000)
  let res = 0
  actions.forEach((action) => {
    if (new Date(action.date) >= prevPeriodDate && new Date(action.date) < nextPeriodAction && action.id === habit.id) {
      res += (action.value ? action.value : 0)
    }
  })
  return res
}