import { FC, useEffect } from 'react';
import { useTitle } from '../../../hooks/useTitle';
import styles from './habits.module.scss';
import { HabitsTitle } from './HabitsTitle/HabitsTitle';
import { HabitsWeekCalendar } from './HabitsWeekCalendar/HabitsWeekCalendar';
import { useDispatch, useSelector } from 'react-redux';
import { currentDateActions, selectCurrentDate } from '../../../store/currentDate/currentDate.slice';
import { HabitsMainSection } from './HabitsMainSection/HabitsMainSection';

export const HabitsScreen: FC = () => {
  useTitle('Привычки')
  const currentDate = useSelector(selectCurrentDate)
  const dispatch = useDispatch()

  useEffect(() => {
    if (currentDate.value == ''){
      dispatch(currentDateActions.setValue(new Date()))
    }
  }, [])

  return (
    <div className={styles.habits}>
      <div className='container'>
        <div className={styles['habits__inner']}>
          <div className={styles['habits__main']}>
            <HabitsTitle />
            <HabitsWeekCalendar />
            <HabitsMainSection />
          </div>
          <aside className={styles['habits__info']}>
            <h1>stats</h1>
          </aside>
        </div>
      </div>
    </div>
  )

}