import { FC, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { LineChart } from '@mui/x-charts/LineChart'
import { selectUploadData } from '@/store/uploadData/uploadData.slice'
import { IChartItem } from '@/interfaces/interfaces'
import { generateAddedHabitsInfo, generateCompletedHabitsInfo } from './GenerateChartsInfo'
import styles from './dashboardcharts.module.scss'

export const DashboardCharts: FC = () => {
  const [completedHabits, setCompletedHabits] = useState<IChartItem>({ axisX: [1], axisY: [0] })
  const [addedHabits, setAddedHabits] = useState<IChartItem>({ axisX: [1], axisY: [0] })
  const { uploadData } = useSelector(selectUploadData)

  useLayoutEffect(() => {
    const completedHabitsInfo = generateCompletedHabitsInfo([...uploadData.actions])
    const addedHabitsInfo = generateAddedHabitsInfo([...uploadData.habits])
    setCompletedHabits(completedHabitsInfo)
    setAddedHabits(addedHabitsInfo)
  }, [])

  return (
    <ul role="list" className={styles['charts']}>
      <li className={styles['charts__item']}>
        <h2 className={styles['charts__item-title']}>График количества выполненных привычек в день</h2>
        <LineChart
          xAxis={[{ data: completedHabits.axisX }]}
          series={[
            {
              data: completedHabits.axisY
            }
          ]}
          width={320}
          height={240}
        />
        <p className={styles['charts__item-subtitle']}>(ось x - дни с момента регистрации, ось y - кол-во выполненных привычек)</p>
      </li>
      <li className={styles['charts__item']}>
        <h2 className={styles['charts__item-title']}>График количества добавленных привычек в день</h2>
        <LineChart
          xAxis={[{ data: addedHabits.axisX }]}
          series={[
            {
              data: addedHabits.axisY
            }
          ]}
          width={320}
          height={240}
        />
        <p className={styles['charts__item-subtitle']}>(ось x - дни с момента регистрации, ось y - кол-во добавленных привычек)</p>
      </li>
    </ul>
  )
}
