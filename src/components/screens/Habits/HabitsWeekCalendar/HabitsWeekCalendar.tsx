import { FC, useEffect, useState } from 'react'
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { handleWeekChange } from '../../../../helpers/HandleWeekChange';
import { useDispatch, useSelector } from 'react-redux';
import { currentDateActions, selectCurrentDate } from '../../../../store/currentDate/currentDate.slice';
import { changeDaysInWeek } from '../../../../helpers/ChangeDateInWeek';
import styles from './weekcalendar.module.scss'

export const HabitsWeekCalendar: FC = () => {
  const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const [weekDates, setWeekDates] = useState<string[]>([]);
  const { currentDate } = useSelector(selectCurrentDate)
  const dispatch = useDispatch()
  
  useEffect(() => {
    const currentDateString = currentDate.split(', ')[0].split('.')
    const weekData = {
      setWeekDates: setWeekDates,
      days: days,
      currentDate: new Date(Number(currentDateString[2]), Number(currentDateString[1])-1, Number(currentDateString[0]))
    }
    handleWeekChange(weekData);
  }, [currentDate]);
  
  const handleChangeWeek = (type: string): void => {
    const currentDateVal: string = currentDate
    const parsedDateVal: number = parseInt(currentDateVal.split(', ')[0].split('.')[0], 10)
    handleChangeDate(type === 'next' ? String(parsedDateVal+7) : String(parsedDateVal-7))
  };
  
  const handleChangeDate = (stringItemDate: string): void => {
    const currentDateVal: string = currentDate
    const newCurrentDate: Date = changeDaysInWeek(currentDateVal.split(', ')[0], Number(stringItemDate));
    dispatch(currentDateActions.setValue(newCurrentDate))
  }

  return (
    <div className={styles['week']}>
      <GrFormPrevious className={styles['week__prev']} onClick={() => handleChangeWeek('prev')} />
      <ul className={styles['week__list']}>
        {days.map((day, index) => (
          <li className={styles['week__list-item']} key={index}>
            <button className={styles['week__item']} onClick={() => handleChangeDate(weekDates[index])}>
              <p className={styles['week__item-day']}>{day}</p>
              <h4 className={styles['week__item-date']}>{weekDates[index]}</h4>
            </button>
          </li>
        ))}
      </ul>
      <GrFormNext className={styles['week__next']} onClick={() => handleChangeWeek('next')} />
    </div>
  );
};