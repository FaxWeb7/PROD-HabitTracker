import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectUploadData } from '../../../../store/uploadData/uploadData.slice';
import { IHabit } from '../../../../models/UploadData/IHabit';
import { sortHabits } from '../../../../helpers/Habits/SortHabits';
import { HabitItem } from '../HabitItem/HabitItem';
import styles from './habitsmainsections.module.scss'
import { selectCurrentDate } from '../../../../store/currentDate/currentDate.slice';

export const HabitsMainSection: FC = () => {
  const { uploadData } = useSelector(selectUploadData)
  const { currentDate } = useSelector(selectCurrentDate)
  const sortedHabits = Object.entries(sortHabits(uploadData.habits, currentDate)).reverse()

  return (
    <div className={styles['habits-main']}>
      {!sortedHabits[0][1].length && !sortedHabits[1][1].length && !sortedHabits[2][1].length ? (
        <div className={styles['habits-main__expect']}>
          <h3>Привычек нет :(</h3>
          <h4>Нажмите на кнопку "Новая привычка" чтобы добавить привычку</h4>
        </div>
      ) : (
        sortedHabits.map(([period, habitsList], idx) => (
        habitsList?.length !== 0 && (
          <div className={styles['habits-main__list-wrapper']} key={idx}>
            <h3 className={styles['habits-main__title']}>{`Привычки на ${period === 'monthlyHabits' ? 'месяц' : period === 'weeklyHabits' ? 'неделю' : 'день'}`}</h3>
            <ul className={styles['habits-main__list']}>
              {habitsList?.map((habit: IHabit, index: number) => (
                <li className={styles['habits-main__item']} key={index}>
                  <HabitItem habit={habit} />
                </li>
              ))}
            </ul>
          </div>
        )
      )))
      }
    </div>
  )
}