import { FC } from 'react';
import { CiCircleMore } from "react-icons/ci";import { IHabit } from '../../../../models/UploadData/IHabit';
import styles from './habititem.module.scss';

interface HabitItemProps {
  habit: IHabit
}

export const HabitItem: FC<HabitItemProps> = ({ habit }: HabitItemProps) => {
  return (
    <div className={styles['habit-item']}>
      <button className={styles['habit-item__button']}>
        <svg className={styles['habit-item__button-icon']} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#1088F2' }} />
            <stop offset="100%" style={{ stopColor: '#0DC7F2' }} />
          </linearGradient>
          <CiCircleMore style={{fill: 'url(#gradient)'}} />
        </svg>
      </button>
      <h5 className={styles['habit-item__title']}>{habit.title}</h5>
    </div>
  )
}