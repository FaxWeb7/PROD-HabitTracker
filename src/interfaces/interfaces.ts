import { IconType } from 'react-icons'
import { IHabit } from '@/models/UploadData/IHabit'
import { IHabitAction } from '@/models/UploadData/IHabitAction'

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
  randomNum: number
}

export interface IAddHabitInputs {
  title: string
  category: string
  period: string
  countable: string
  targetValue?: string
}

export interface IUserStats {
  icon: IconType
  text: string
}

export interface IChartItem {
  axisX: number[]
  axisY: number[]
}
