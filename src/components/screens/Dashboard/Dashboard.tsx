import { FC } from 'react';
import { useTitle } from '../../../hooks/useTitle';
import styles from './dashboard.module.scss';

export const Dashboard: FC = () => {
  useTitle('Статистика')

  return (
    <div className={styles.dashboard}>
      <div className="container">
        Dashboard
      </div>
    </div>
  )
}