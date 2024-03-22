import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/user/user.slice';
import { IUserStats } from '@/interfaces/interfaces';
import { getStatsElByText } from './GetStatsElByText';
import styles from './userstats.module.scss'

interface IUserStatsProps {
  statsList: IUserStats[][]
}

export const UserStats: FC<IUserStatsProps> = ({ statsList }: IUserStatsProps) => {
  const { user } = useSelector(selectUser)

  return (
    <div className={styles['user-stats']} role='list'>
      {statsList.map((listItem, index) => (
        <div className={styles['user-stats__col']} role='list' key={index}>
          {listItem.map((statsItem, idx) => (
            <div className={styles['user-stats__item']} key={idx}>
              <statsItem.icon className={styles['user-stats__item-icon']} />
              <div className={styles['user-stats__item-text']}>
                <h3 className={styles['user-stats__item-title']}>{getStatsElByText(statsItem.text, user)}</h3>
                <h4 className={styles['user-stats__item-subtitle']}>{statsItem.text}</h4>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}