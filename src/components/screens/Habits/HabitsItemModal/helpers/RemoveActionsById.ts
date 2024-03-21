import { IHabitAction } from "../../../../../models/UploadData/IHabitAction";

export const removeActionsById = (actions: IHabitAction[], id: number) => {
  const newActions = actions.filter(action => action.id !== id)
  return newActions
}