import { FC } from 'react'
import { useTitle } from '@/hooks/useTitle'
import { HabitsTitle } from './HabitsTitle/HabitsTitle'
import { HabitsWeekCalendar } from './HabitsWeekCalendar/HabitsWeekCalendar'
import { HabitsMainSection } from './HabitsMainSection/HabitsMainSection'
import { HabitsStats } from './HabitsStats/HabitsStats'
import { HabitsUpload } from './HabitsUpload/HabitsUpload'
import { HabitsDate } from './HabitsDate/HabitsDate'
import styles from './habits.module.scss'

export const HabitsScreen: FC = () => {
  useTitle('Привычки')

  return (
    <div className={styles.habits}>
      <div className="container">
        <div className={styles['habits__inner']}>
          <div className={styles['habits__main']}>
            <HabitsTitle />
            <HabitsWeekCalendar />
            <HabitsMainSection />
          </div>
          <aside className={styles['habits__info']}>
            <HabitsStats />
            <HabitsUpload />
            <HabitsDate />
          </aside>
        </div>
      </div>
    </div>
  )
}
