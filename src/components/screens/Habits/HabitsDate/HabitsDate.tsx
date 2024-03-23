import { ChangeEvent, FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentDateActions } from '@/store/currentDate/currentDate.slice';
import { selectUploadData } from '@/store/uploadData/uploadData.slice';
import { selectUser, userActions } from '@/store/user/user.slice';
import { storeFormatDate } from '@/helpers/ChangeDateFormat';
import { countUserStats } from '@/helpers/CountUserStats';
import { PrimaryButton } from '@/components/shared/PrimaryButton/PrimaryButton';
import styles from './habitsdate.module.scss'

export const HabitsDate: FC = () => {
  const [dateTime, setDateTime] = useState<Date>(new Date())
  const { user } = useSelector(selectUser)
  const { uploadData } = useSelector(selectUploadData)
  const dispatch = useDispatch()

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDateTime(new Date(event.target.value))
  }

  const handleDateSubmit = () => {
    const newDate = storeFormatDate(dateTime)
    dispatch(currentDateActions.setValue(newDate))
    const newUser = countUserStats({user, uploadData, currentDate: newDate})
    dispatch(userActions.setUser(newUser))
  }

  return (
    <div className={styles['habits-date']}>
      <h2 className={styles['habits-date__text']}>Установка текущей даты</h2>
      <input id='date-input' type='datetime-local' name='date-input' autoComplete='date' onChange={handleDateChange} className={styles['habits-date__input']} />
      <PrimaryButton text='Готово' type='button' onClick={handleDateSubmit} className={styles['habits-date__button']} />
    </div>
  )
}