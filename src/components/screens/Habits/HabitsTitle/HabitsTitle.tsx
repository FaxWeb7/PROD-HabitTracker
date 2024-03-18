import { FC } from 'react';
import { VscDiffAdded } from "react-icons/vsc";
import { convertDate } from '../../../../helpers/ConvertDate';
import { useSelector } from 'react-redux';
import { selectCurrentDate } from '../../../../store/currentDate/currentDate.slice';
import styles from './habitstitle.module.scss';
import { PrimaryButton } from '../../../shared/PrimaryButton/PrimaryButton';

export const HabitsTitle: FC = () => {
  const { value } = useSelector(selectCurrentDate)

  return (
    <div className={styles['habits-title']}>
      <div className={styles['habits-title__info']}>
        <h1 className={styles['habits-title__info-title']}>{convertDate(value)}</h1>
      </div>
      <PrimaryButton icon={VscDiffAdded} text='Новая привычка' onClick={() => {}} />
    </div>
  )
}

