import { FC } from 'react';
import { sortHabits } from '../../../../helpers/SortHabits';
import { IHabit } from '../../../../models/UploadData/IHabit';
import { HabitItem } from '../HabitItem/HabitItem';
import { useSelector } from 'react-redux';
import { selectUploadData } from '../../../../store/uploadData/uploadData.slice';
import styles from './habitsmainsections.module.scss'

export const HabitsMainSection: FC = () => {
  const { uploadData } = useSelector(selectUploadData)

  return (
    <div className={styles['habits-main']}>
      {!Object.keys(uploadData.habits).length ? (
        <div className={styles['habits-main__expect']}>
          <h3>Привычек нет :(</h3>
          <h4>Нажмите на кнопку "Новая привычка" чтобы добавить привычку</h4>
        </div>
      ) : (
        Object.entries(sortHabits(uploadData.habits)).reverse().map(([period, habitsList], idx) => (
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