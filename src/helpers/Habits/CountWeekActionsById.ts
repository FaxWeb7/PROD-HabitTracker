import { IHabitHelper } from "../../interfaces/interfaces";

export const countWeekActionsById = ({actions, habit, currentDate, period}: IHabitHelper)  => {
  const curDate = new Date(currentDate)
  let nextWeekAction = new Date(habit.addDate)
  while (nextWeekAction <= curDate){
    nextWeekAction = new Date(nextWeekAction.getTime() + period * 24 * 60 * 60 * 1000);
  }
  const prevWeekDate = new Date(nextWeekAction.getTime() - period * 24 * 60 * 60 * 1000);
  let res = 0
  actions.forEach((action) => {
    if (new Date(action.date) >= prevWeekDate && new Date(action.date) < nextWeekAction && action.id === habit.id) {
      res += (action.value ? action.value : 0)
    }
  })
  return res
}