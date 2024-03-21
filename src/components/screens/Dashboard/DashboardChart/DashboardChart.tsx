import { FC } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import styles from './dashboard.module.scss'

export const DashboardChart: FC = () => {
  
  return (
    <div className={styles['chart']}>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10, 11, 12, 13, 14, 15, 20, 30, 32, 36, 42, 54] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5, 2, 10, 12, 13, 15, 18, 25, 30, 32, 28, 25],
          },
        ]}
        width={320}
        height={240}
      />
    </div>
  )
}