import { FC } from 'react';
import { useSelector } from 'react-redux';
import { VscDiffAdded } from "react-icons/vsc";
import { selectCurrentDate } from '../../../../store/currentDate/currentDate.slice';
import { convertDate } from '../../../../helpers/ConvertDate';
import { PrimaryButton } from '../../../shared/PrimaryButton/PrimaryButton';
import styles from './habitstitle.module.scss';

export const HabitsTitle: FC = () => {
  const { currentDate } = useSelector(selectCurrentDate)

  return (
    <div className={styles['habits-title']}>
      <div className={styles['habits-title__info']}>
        <h1 className={styles['habits-title__info-title']}>{convertDate(currentDate)}</h1>
      </div>
      <PrimaryButton icon={VscDiffAdded} text='Новая привычка' onClick={() => {}} />
    </div>
  )
}

