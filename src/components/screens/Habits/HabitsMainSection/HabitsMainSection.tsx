import { FC } from 'react'
import { useSelector } from 'react-redux'
import { selectUploadData } from '@/store/uploadData/uploadData.slice'
import { selectCurrentDate } from '@/store/currentDate/currentDate.slice'
import { IHabit } from '@/models/UploadData/IHabit'
import { sortHabits } from '@/helpers/Habits/SortHabits'
import { HabitItem } from '../HabitItem/HabitItem'
import { getPeriodTitle } from './GetPeriodTitle'
import styles from './habitsmainsections.module.scss'

export const HabitsMainSection: FC = () => {
  const { uploadData } = useSelector(selectUploadData)
  const { currentDate } = useSelector(selectCurrentDate)
  const sortedHabits = Object.entries(sortHabits(uploadData.habits, currentDate)).reverse()
  const isEmptyHabits = !sortedHabits[0][1].length && !sortedHabits[1][1].length && !sortedHabits[2][1].length

  return (
    <div className={styles['habits-main']}>
      {isEmptyHabits ? (
        <div className={styles['habits-main__expect']}>
          <p className={styles['habits-main__expect-title']}>Привычек нет :(</p>
          <p>Нажмите на кнопку &quot;Новая привычка&quot; чтобы добавить привычку</p>
        </div>
      ) : (
        sortedHabits.map(
          ([period, habitsList], idx) =>
            habitsList?.length !== 0 && (
              <div className={styles['habits-main__list-wrapper']} key={idx}>
                <p className={styles['habits-main__title']}>Привычки на {getPeriodTitle(period)}</p>
                <ul className={styles['habits-main__list']} role="list">
                  {habitsList?.map((habit: IHabit, index: number) => (
                    <li className={styles['habits-main__item']} key={index}>
                      <HabitItem habit={habit} />
                    </li>
                  ))}
                </ul>
              </div>
            )
        )
      )}
    </div>
  )
}
