import { FC } from 'react';
import styles from './habitsstats.module.scss'
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../store/user/user.slice';
import { HabitStatsList } from './HabitsStatsList';

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
      {/* <div className={styles['habits-stats__col']}>
        <div className={styles['habits-stats__item']}>
          <FaMedal className={styles['habits-stats__item-icon']} />
          <div className={styles['habits-stats__item-text']}>
            <h3 className={styles['habits-stats__item-title']}>1</h3>
            <h4 className={styles['habits-stats__item-subtitle']}>Уровень</h4>
          </div>
        </div>
        <div className={styles['habits-stats__item']}>
          <BsFillLightningFill className={styles['habits-stats__item-icon']} />
          <div className={styles['habits-stats__item-text']}>
            <h3 className={styles['habits-stats__item-title']}>0</h3>
            <h4 className={styles['habits-stats__item-subtitle']}>Рекорд</h4>
          </div>
        </div>
      </div>
      <div className={styles['habits-stats__col']}>
        <div className={styles['habits-stats__item']}>
          <FaLevelUpAlt className={styles['habits-stats__item-icon']} />
          <div className={styles['habits-stats__item-text']}>
            <h3 className={styles['habits-stats__item-title']}>0</h3>
            <h4 className={styles['habits-stats__item-subtitle']}>Опыт</h4>
          </div>
        </div>
        <div className={styles['habits-stats__item']}>
          <FaCoins className={styles['habits-stats__item-icon']} />
          <div className={styles['habits-stats__item-text']}>
            <h3 className={styles['habits-stats__item-title']}>{user.prodCoins}</h3>
            <h4 className={styles['habits-stats__item-subtitle']}>ProdCoin</h4>
          </div>
        </div>
      </div> */}
    </div>
  )
}