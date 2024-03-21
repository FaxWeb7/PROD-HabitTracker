import { FC } from 'react';
import { useTitle } from '../../../hooks/useTitle';
import { UserStats } from '../../shared/UserStats/UserStats';
import { DashboardChart } from './DashboardChart/DashboardChart';
import { dashboardStatsList } from './DashboardStatsList';
import styles from './dashboard.module.scss';

export const Dashboard: FC = () => {
  useTitle('Статистика')

  return (
    <div className={styles.dashboard}>
      <div className="container">
        <div className={styles['dashboard__inner']}>
          <DashboardChart />
          <UserStats statsList={dashboardStatsList} />
        </div>
      </div>
    </div>
  )
}