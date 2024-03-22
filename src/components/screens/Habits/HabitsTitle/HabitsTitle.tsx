import { FC } from 'react';
import { useSelector } from 'react-redux';
import { VscDiffAdded } from "react-icons/vsc";
import { selectCurrentDate } from '@/store/currentDate/currentDate.slice';
import { useOutside } from '@/hooks/useOutisde';
import { convertDate } from '@/helpers/ConvertDate';
import { PrimaryButton } from '@/components/shared/PrimaryButton/PrimaryButton';
import { HabitAddModal } from '../HabitAddModal/HabitAddModal';
import styles from './habitstitle.module.scss';

export const HabitsTitle: FC = () => {
  const { currentDate } = useSelector(selectCurrentDate)
  const { ref, isShow, setIsShow } = useOutside(false)

  return (
    <div ref={ref}>
      {isShow && <HabitAddModal  setIsModalShow={setIsShow} />}
      <div className={styles['habits-title']}>
        <div className={styles['habits-title__info']}>
          <h1 className={styles['habits-title__info-title']}>{convertDate(currentDate)}</h1>
        </div>
        <PrimaryButton icon={VscDiffAdded} type='button' text='Новая привычка' onClick={() => setIsShow(!isShow)} />
      </div>
    </div>
  )
}