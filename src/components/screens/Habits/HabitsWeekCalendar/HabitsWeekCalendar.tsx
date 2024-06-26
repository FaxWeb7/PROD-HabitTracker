import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GrFormPrevious } from 'react-icons/gr'
import { GrFormNext } from 'react-icons/gr'
import { currentDateActions, selectCurrentDate } from '@/store/currentDate/currentDate.slice'
import { selectUser, userActions } from '@/store/user/user.slice'
import { selectUploadData } from '@/store/uploadData/uploadData.slice'
import { handleWeekChange } from '@/helpers/Habits/HandleWeekChange'
import { changeDaysInWeek } from '@/helpers/Habits/ChangeDateInWeek'
import { dateWithoutTime } from '@/helpers/ChangeDateFormat'
import { countUserStats } from '@/helpers/CountUserStats'
import styles from './weekcalendar.module.scss'

const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

export const HabitsWeekCalendar: FC = () => {
  const [weekDates, setWeekDates] = useState<string[]>([])
  const { currentDate } = useSelector(selectCurrentDate)
  const { user } = useSelector(selectUser)
  const { uploadData } = useSelector(selectUploadData)
  const dispatch = useDispatch()

  useEffect(() => {
    const weekData = {
      setWeekDates: setWeekDates,
      days: days,
      currentDate: new Date(currentDate)
    }
    handleWeekChange(weekData)
  }, [currentDate])

  const handleChangeWeek = (type: string): void => {
    const parsedDay: number = Number(dateWithoutTime(currentDate).split('-')[2])
    handleChangeDate(type === 'next' ? String(parsedDay + 7) : String(parsedDay - 7))
  }

  const handleChangeDate = (stringItemDate: string): void => {
    const newCurrentDate: string = changeDaysInWeek(dateWithoutTime(currentDate), Number(stringItemDate))
    dispatch(currentDateActions.setValue(newCurrentDate))
    const newUser = countUserStats({ user, uploadData, currentDate: newCurrentDate })
    dispatch(userActions.setUser(newUser))
  }

  return (
    <div className={styles['week']}>
      <GrFormPrevious className={styles['week__prev']} onClick={() => handleChangeWeek('prev')} />
      <ul className={styles['week__list']}>
        {days.map((day, index) => (
          <li className={styles['week__list-item']} key={index}>
            <button className={styles['week__item']} type="button" onClick={() => handleChangeDate(weekDates[index])}>
              <p className={styles['week__item-day']}>{day}</p>
              <p className={styles['week__item-date']}>{weekDates[index]}</p>
            </button>
          </li>
        ))}
      </ul>
      <GrFormNext className={styles['week__next']} onClick={() => handleChangeWeek('next')} />
    </div>
  )
}
