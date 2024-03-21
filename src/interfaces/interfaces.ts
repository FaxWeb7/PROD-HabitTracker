import { IHabit } from "../models/UploadData/IHabit"
import { IHabitAction } from "../models/UploadData/IHabitAction"

export interface ISortedHabits {
  monthlyHabits: IHabit[]
  weeklyHabits: IHabit[]
  dailyHabits: IHabit[]
}

export interface IHabitHelper {
  actions: IHabitAction[]
  habit: IHabit
  currentDate: string
  period: number
}

export interface IAuthFormInputs {
  name: string
  color: string
}

export interface IAddHabitInputs {
  title: string
  category: string
  period: string
  countable: string
  targetValue?: string
}