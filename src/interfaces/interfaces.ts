import { IHabit } from "../models/UploadData/IHabit"

export interface ISortedHabits {
  monthlyHabits: IHabit[]
  weeklyHabits: IHabit[]
  dailyHabits: IHabit[]
}