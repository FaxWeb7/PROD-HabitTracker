import { FC, useEffect, useState } from 'react';
import styles from './habitsmainsections.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { selectUploadData, uploadDataActions } from '../../../../store/uploadData/uploadData.slice';
import { sortHabits } from '../../../../helpers/SortHabits';
import { IHabit } from '../../../../models/UploadData/IHabit';
import { IHabitAction } from '../../../../models/UploadData/IHabitAction';
import { HabitItem } from '../HabitItem/HabitItem';
import { Loading } from '../../../shared/Loading/Loading';

export const HabitsMainSection: FC = () => {
  const [isloading, setIsLoading] = useState<boolean>(true)
  const uploadData = useSelector(selectUploadData)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!Object.keys(uploadData).length){
      const initUploadDataVal = {
        habits: [] as IHabit[],
        actions: [] as IHabitAction[]
      }
      dispatch(uploadDataActions.setUploadData(initUploadDataVal))
    }
    setIsLoading(false)
  }, [])

  return (
    <div className={styles['habits-main']}>
      {isloading ? (
        <Loading />
      ) : (
        <>
          {Object.entries(sortHabits(uploadData.habits)).reverse().map(([period, habitsList], idx) => (
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
          ))}
        </>
      )}
    </div>
  )
}