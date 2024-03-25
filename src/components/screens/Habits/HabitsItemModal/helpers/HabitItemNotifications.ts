import toast from 'react-hot-toast'
import { DAILY_EXPERIENCE, LEVEL_EXPERIENCE, MONTHLY_EXPERIENCE, WEEKLY_EXPERIENCE } from '@/constants/constants'
import { IHabit } from '@/models/UploadData/IHabit'
import { IUser } from '@/models/User/IUser'

interface INotificationConditionParams {
  prevIsChecked: boolean
  isChecked: boolean
  prevInputValue: string
  inputValue: string
  inputSum: number
  habit: IHabit
}

export const notificationsCondition = (params: INotificationConditionParams) => {
  return (
    (params.isChecked && !params.prevIsChecked) ||
    (params.habit.period === 'daily' &&
      params.habit.targetValue &&
      Number(params.inputValue) >= params.habit.targetValue &&
      Number(params.prevInputValue) < params.habit.targetValue) ||
    (params.habit.period !== 'daily' &&
      params.habit.targetValue &&
      Number(params.prevInputValue) + params.inputSum < params.habit.targetValue &&
      Number(params.inputValue) + params.inputSum >= params.habit.targetValue)
  )
}

export const levelNotification = (user: IUser) => {
  toast.success(`Поздравляем, вы перешли на ${user.level} уровень!`, {
    duration: 3500,
    position: 'top-right'
  })
}

export const experienceNotification = (habit: IHabit, user: IUser) => {
  toast.success(
    `Поздравляем, вы получили ${defineXpByPeriod(habit.period)} опыта! До следующего уровня осталось ${LEVEL_EXPERIENCE - (user.currentExperience % LEVEL_EXPERIENCE)} опыта`,
    {
      duration: 4500,
      position: 'top-right'
    }
  )
}

const defineXpByPeriod = (period: string) => {
  return period === 'daily' ? DAILY_EXPERIENCE : period === 'weekly' ? WEEKLY_EXPERIENCE : MONTHLY_EXPERIENCE
}
