import { FC } from 'react';
import { HabitStatsList } from './HabitsStatsList';
import { UserStats } from '../../../shared/UserStats/UserStats';
import styles from './habitsstats.module.scss'

export const HabitsStats: FC = () => {
  return (
    <div className={styles['habits-stats']}>
      <UserStats statsList={HabitStatsList} />
    </div>
  )
}