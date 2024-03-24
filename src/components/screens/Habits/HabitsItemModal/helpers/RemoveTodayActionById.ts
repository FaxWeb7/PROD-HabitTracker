import { IHabitAction } from '@/models/UploadData/IHabitAction'
import { dateWithoutTime } from '@/helpers/ChangeDateFormat'

export const removeTodayActionById = (actions: IHabitAction[], id: number, currentDate: string): IHabitAction[] => {
  const today = dateWithoutTime(currentDate)
  const index = actions.findIndex((action) => today === dateWithoutTime(action.date) && action.id === id)
  if (index !== -1) {
    actions.splice(index, 1)
  }
  return actions
}
