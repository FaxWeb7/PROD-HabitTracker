import { ChangeEvent, FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { currentDateActions } from '../../../../store/currentDate/currentDate.slice';
import { storeFormatDate } from '../../../../helpers/ChangeDateFormat';
import { PrimaryButton } from '../../../shared/PrimaryButton/PrimaryButton';
import styles from './habitsdate.module.scss'

export const HabitsDate: FC = () => {
  const [dateTime, setDateTime] = useState<Date>(new Date())
  const dispatch = useDispatch()

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDateTime(new Date(event.target.value))
  }

  const handleDateSubmit = () => {
    dispatch(currentDateActions.setValue(storeFormatDate(dateTime)))
  }

  return (
    <div className={styles['habits-date']}>
      <h2 className={styles['habits-date__text']}>Установка текущей даты</h2>
      <input id='file-date' type='datetime-local' autoComplete='date' onChange={handleDateChange} className={styles['habits-date__input']} />
      <PrimaryButton text='Готово' onClick={handleDateSubmit} className={styles['habits-date__button']} />
    </div>
  )
}