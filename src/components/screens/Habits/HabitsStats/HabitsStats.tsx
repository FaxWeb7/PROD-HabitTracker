import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../store/user/user.slice';
import { HabitStatsList } from './HabitsStatsList';
import styles from './habitsstats.module.scss'

export const HabitsStats: FC = () => {
  const { user } = useSelector(selectUser)

  return (
    <div className={styles['habits-stats']}>
      {HabitStatsList.map((listItem, index) => (
        <div className={styles['habits-stats__col']} key={index}>
          {listItem.map((statsItem, idx) => (
            <div className={styles['habits-stats__item']} key={idx}>
              <statsItem.icon className={styles['habits-stats__item-icon']} />
              <div className={styles['habits-stats__item-text']}>
                <h3 className={styles['habits-stats__item-title']}>
                  {statsItem.text === 'Уровень' ? user.level : statsItem.text === 'Рекорд' ? user.currentStreak : statsItem.text === 'Опыт' ? user.currentExperience : user.prodCoins}
                  </h3>
                <h4 className={styles['habits-stats__item-subtitle']}>{statsItem.text}</h4>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}