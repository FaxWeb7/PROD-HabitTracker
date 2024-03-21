import { IHabitAction } from "../../../../../models/UploadData/IHabitAction";
import { dateWithoutTime } from "../../../../../helpers/ChangeDateFormat";

export const getTodayActionById = (actions: IHabitAction[], id: number, currentDate: string): IHabitAction => {
  const today = dateWithoutTime(currentDate)
  const index = actions.findIndex(action => today === dateWithoutTime(action.date) && action.id === id)
  if (index !== -1) {
    return actions[index]
  }
  return {} as IHabitAction
}