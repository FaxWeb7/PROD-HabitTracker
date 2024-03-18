import { IHabit } from "./IHabit";
import { IHabitAction } from "./IHabitAction";

export interface IUploadData {
    habits: IHabit[]
    actions: IHabitAction[]
}