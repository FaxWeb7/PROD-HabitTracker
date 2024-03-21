import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../store/user/user.slice';
import { getStatsElByText } from './GetStatsElByText';
import { HabitStatsList } from './HabitsStatsList';
import styles from './habitsstats.module.scss'

export const HabitsStats: FC = () => {
  const { user } = useSelector(selectUser)

  return (
    <div className={styles['habits-stats']} role='list'>
      {HabitStatsList.map((listItem, index) => (
        <div className={styles['habits-stats__col']} role='list' key={index}>
          {listItem.map((statsItem, idx) => (
            <div className={styles['habits-stats__item']} key={idx}>
              <statsItem.icon className={styles['habits-stats__item-icon']} />
              <div className={styles['habits-stats__item-text']}>
                <h3 className={styles['habits-stats__item-title']}>{getStatsElByText(statsItem.text, user)}</h3>
                <h4 className={styles['habits-stats__item-subtitle']}>{statsItem.text}</h4>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}