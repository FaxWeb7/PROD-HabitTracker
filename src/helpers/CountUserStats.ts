import { DAILY_EXPERIENCE, LEVEL_EXPERIENCE, MONTHLY_EXPERIENCE, WEEKLY_EXPERIENCE } from "@/constants/constants"
import { IHabit } from "@/models/UploadData/IHabit"
import { IUploadData } from "@/models/UploadData/IUploadData"
import { IUser } from "@/models/User/IUser"
import { dateWithoutTime } from "./ChangeDateFormat"

interface ICountUserStats {
  user: IUser
  uploadData: IUploadData
  currentDate: string
}

export const countUserStats = ({user, uploadData, currentDate}: ICountUserStats): IUser => {
  const { habits, actions } = uploadData
  const newUser: IUser = {...user}
  if (!habits || !habits.length) return {...user, level: 1, currentExperience: 0, currentStreak: 0}

  let curExp = 0
  habits.forEach((habit) => {
    if (new Date(habit.addDate) > new Date(currentDate)) return
    let actionCounter = 0
    if (!habit.targetValue){
      actions.forEach((action) => {
        if (action.id === habit.id && new Date(action.date) <= new Date(currentDate) && (!habit.stoppedDate || new Date(action.date) <= new Date(habit.stoppedDate))){
          actionCounter++
        }
      })
      if (habit.period === 'daily'){
        const skippedSum = Math.floor(((Number(new Date((habit.stoppedDate ? habit.stoppedDate : currentDate))) - Number(new Date(habit.addDate))) / (1000 * 60 * 60 * 24) + 1) - actionCounter - 1)*DAILY_EXPERIENCE
        const habitSum = (actionCounter*DAILY_EXPERIENCE) - (skippedSum > 0 ? Math.floor(skippedSum/4) : 0) - (user.spendedExperience || 0)
        curExp += habitSum
      }
      else if (habit.period === 'weekly' || habit.period === 'monthly'){
        let periodCounter = 0
        const curDate = new Date((habit.stoppedDate ? habit.stoppedDate : currentDate))
        let nextPeriodAction = new Date(habit.addDate)
        while (nextPeriodAction < curDate){
          nextPeriodAction = new Date(nextPeriodAction.getTime() + (habit.period === 'weekly' ? 7 : 30) * 24 * 60 * 60 * 1000)
          periodCounter++
        }
        const skippedSum = (periodCounter - actionCounter - 1)*(habit.period === 'weekly' ? WEEKLY_EXPERIENCE : MONTHLY_EXPERIENCE)
        const habitSum = (actionCounter*(habit.period === 'weekly' ? WEEKLY_EXPERIENCE : MONTHLY_EXPERIENCE)) - (skippedSum > 0 ? Math.floor(skippedSum/4) : 0) - (user.spendedExperience || 0)
        curExp += habitSum
      }
    } else {
      if (habit.period === 'daily'){
        actions.forEach((action) => {
          if (action.id === habit.id && new Date(action.date) <= new Date(currentDate) && (!habit.stoppedDate || new Date(action.date) <= new Date(habit.stoppedDate))){
            if (action.value && habit.targetValue) (action?.value >= habit?.targetValue ? actionCounter++ : actionCounter+=0)
          }
        })
        const skippedSum = Math.floor(((Number(new Date((habit.stoppedDate ? habit.stoppedDate : currentDate))) - Number(new Date(habit.addDate))) / (1000 * 60 * 60 * 24) + 1) - actionCounter - 1)*DAILY_EXPERIENCE
        const habitSum = (actionCounter*DAILY_EXPERIENCE) - (skippedSum > 0 ? Math.floor(skippedSum/4) : 0) - (user.spendedExperience || 0)
        curExp += habitSum
      } else if (habit.period === 'weekly' || habit.period === 'monthly'){
        let periodCounter = 0
        const curDate = new Date((habit.stoppedDate ? habit.stoppedDate : currentDate))
        let nextPeriodAction = new Date(habit.addDate)
        let goodActionsCounter = 0
        while (nextPeriodAction <= curDate){
          nextPeriodAction = new Date(nextPeriodAction.getTime() + (habit.period === 'weekly' ? 7 : 30) * 24 * 60 * 60 * 1000)
          const prevPeriodDate = new Date(nextPeriodAction.getTime() - (habit.period === 'weekly' ? 7 : 30) * 24 * 60 * 60 * 1000)
          let targetValueCounter = 0
          actions.forEach((action) => {
            if (new Date(action.date) >= prevPeriodDate && new Date(action.date) <= nextPeriodAction && action.id === habit.id) {
              targetValueCounter += (action.value ? action.value : 0)
            }
          })
          if (targetValueCounter >= habit.targetValue) goodActionsCounter++
          periodCounter++
        }
        const skippedSum = (periodCounter - goodActionsCounter - 1)*(habit.period === 'weekly' ? WEEKLY_EXPERIENCE : MONTHLY_EXPERIENCE)
        const habitSum = (goodActionsCounter*(habit.period === 'weekly' ? WEEKLY_EXPERIENCE : MONTHLY_EXPERIENCE)) - (skippedSum > 0 ? Math.floor(skippedSum/4) : 0) - (user.spendedExperience || 0)
        curExp += habitSum
      }
    }
    newUser.maxExperience = (newUser.maxExperience > curExp ? newUser.maxExperience : curExp)
  })

  let prevDay = new Date(new Date(currentDate).getTime() - 1 * 24 * 60 * 60 * 1000)
  let curStreak = 0
  let maxStreak = 0
  let streakCounter = 0
  let flag = true
  while (prevDay >= getMinHabitDate(habits)){
    let isHabitsCompleted = true
    habits.forEach((habit) => {
      let isHabitCompleted = false
      if (habit.period === 'daily' && (!habit.stoppedDate || new Date(prevDay) <= new Date(habit.stoppedDate))){
        actions.forEach((action) => {
          if (action.id === habit.id && dateWithoutTime(action.date) === dateWithoutTime(prevDay.toISOString())){
            isHabitCompleted = true
            if (action.value && habit.targetValue && action.value < habit.targetValue) isHabitCompleted = false 
          }
        })
      }
      if (!isHabitCompleted && (!habit.stoppedDate || new Date(prevDay) > new Date(habit.stoppedDate))){
        isHabitsCompleted = false
        return
      }
    })
    if (!isHabitsCompleted || String(prevDay) == String(getMinHabitDate(habits).getTime() - 1 * 1000 * 60 * 60 * 24)) {
      flag = false
      streakCounter = 0
      maxStreak = maxStreak > streakCounter ? maxStreak : streakCounter
    }
    maxStreak = maxStreak > streakCounter ? maxStreak : streakCounter
    prevDay = new Date(prevDay.getTime() - 1 * 1000 * 60 * 60 * 24)
    if (flag) curStreak++
    streakCounter++
  }
  newUser.currentExperience = curExp+Math.ceil(curExp*(user.currentStreak/100))
  newUser.level = (Math.floor(newUser.currentExperience/LEVEL_EXPERIENCE)+1 > 1 ? Math.floor(newUser.currentExperience/LEVEL_EXPERIENCE)+1 : 1)
  newUser.currentStreak = curStreak
  newUser.maxStreak = maxStreak > curStreak ? maxStreak : curStreak
  return newUser
}

const getMinHabitDate = (habits: IHabit[]): Date => {
  let minDate = new Date(habits[0].addDate)
  habits.forEach((habit) => {
    if (new Date(habit.addDate) < minDate) minDate = new Date(habit.addDate)
  })
  return minDate
}