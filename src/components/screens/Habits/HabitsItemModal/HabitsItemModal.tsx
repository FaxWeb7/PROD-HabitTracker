import { FC, useEffect, useState } from 'react';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { TfiSave } from "react-icons/tfi";
import { RiEyeOffLine } from "react-icons/ri";
import { FiTrash2 } from "react-icons/fi";
import { IHabit } from '../../../../models/UploadData/IHabit';
import { convertDate } from '../../../../helpers/ConvertDate';
import { PrimaryButton } from '../../../shared/PrimaryButton/PrimaryButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectUploadData, uploadDataActions } from '../../../../store/uploadData/uploadData.slice';
import { removeTodayActionById } from '../../../../helpers/Habits/RemoveTodayActionById';
import { IHabitAction } from '../../../../models/UploadData/IHabitAction';
import { getTodayActionById } from '../../../../helpers/Habits/GetTodayActionById';
import { selectCurrentDate } from '../../../../store/currentDate/currentDate.slice';
import { getPeriodActionsById } from '../../../../helpers/Habits/GetPeriodActionsById';
import { countWeekActionsById } from '../../../../helpers/Habits/CountWeekActionsById';
import { addStopDateHabitById } from '../../../../helpers/Habits/AddStopDateHabitById';
import { removeHabitById } from '../../../../helpers/Habits/RemoveHabitById';
import { removeActionsById } from '../../../../helpers/Habits/RemoveActionsById';
import styles from './habitsitemmodal.module.scss'

interface HabitsItemModalProps {
  habit: IHabit
  setIsModalShow: React.Dispatch<React.SetStateAction<boolean>>
}

export const HabitsItemModal: FC<HabitsItemModalProps> = ({ habit, setIsModalShow }: HabitsItemModalProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const [inputSum, setInputSum] = useState<number>(0)
  const { uploadData } = useSelector(selectUploadData)
  const { currentDate } = useSelector(selectCurrentDate)
  const dispatch = useDispatch()

  useEffect(() => {
    const dailyAction: IHabitAction = getTodayActionById([...uploadData.actions], habit.id, currentDate)
    if (Object.keys(dailyAction).length !== 0) {
      if (dailyAction.value) setInputValue(String(dailyAction.value))
      else setIsChecked(true)
    }
    if (habit.period === 'weekly' || habit.period == 'monthly'){
      const habitHelperData = {
        actions: [...uploadData.actions],
        habit: {...habit},
        currentDate: currentDate,
        period: (habit.period === 'weekly' ? 7 : 30)
      }
      if (habit.targetValue){
        const actionSum = countWeekActionsById(habitHelperData)
        if (actionSum !== 0){
          setInputSum(actionSum)
        }
      } else if (getPeriodActionsById(habitHelperData)) {
        setIsChecked(true)
      }
    }
  }, [])
  

  const handleSaveHabit = () => {
    const newActions = removeTodayActionById([...uploadData.actions], habit.id, currentDate)
    dispatch(uploadDataActions.setUploadData({habits: uploadData.habits, actions: newActions }))

    if (inputValue != ''){
      const newAction = {id: habit.id, date: currentDate, value: Number(inputValue)} 
      dispatch(uploadDataActions.addAction(newAction))
    } else if (isChecked) {
      const newAction = {id: habit.id, date: currentDate}
      dispatch(uploadDataActions.addAction(newAction))
    }
    setIsModalShow(false)
  }
  
  const handleStopHabit = () => {
    const newHabits = addStopDateHabitById([...uploadData.habits], habit.id, currentDate)
    dispatch(uploadDataActions.setUploadData({habits: newHabits, actions: [...uploadData.actions]}))
    setIsModalShow(false)
  }
  
  const handleRemoveHabit = () => {
    const newHabits = removeHabitById([...uploadData.habits], habit.id)
    const newActions = removeActionsById([...uploadData.actions], habit.id)
    dispatch(uploadDataActions.setUploadData({habits: newHabits, actions: newActions}))
    setIsModalShow(false)
  }
  
  return (
    <div className={styles['habits-modal']}>
      <button className={styles['habits-modal__close']} onClick={() => setIsModalShow(false)}>
        <IoIosCloseCircleOutline className={styles['habits-modal__close-icon']} />
      </button>
      <div className={styles['habits-modal__item']}>
        <h4 className={styles['habits-modal__item-title']}>Название привычки: </h4>
        <h4 className={styles['habits-modal__item-value']}>{habit.title}</h4>
      </div>
      <div className={styles['habits-modal__item']}>
        <h4 className={styles['habits-modal__item-title']}>Категория: </h4>
        <h4 className={styles['habits-modal__item-value']}>{habit.category}</h4>
      </div>
      <div className={styles['habits-modal__item']}>
        <h4 className={styles['habits-modal__item-title']}>Дата создания: </h4>
        <h4 className={styles['habits-modal__item-value']}>
          {convertDate(habit.addDate)}
        </h4>
      </div>
      <div className={styles['habits-modal__item']}>
        <h4 className={styles['habits-modal__item-title']}>Период привычки: </h4>
        <h4 className={styles['habits-modal__item-value']}>
          {habit.period === 'monthly' ? 'месяц' : habit.period === 'weekly' ? 'неделя' : 'день'}
        </h4>
      </div>
      {habit.targetValue && (
        <div className={styles['habits-modal__item']}>
          <h4 className={styles['habits-modal__item-title']}>Сделано / Цель: </h4>
          <h4 className={styles['habits-modal__item-value']}>{inputSum} / {habit.targetValue}</h4>
        </div>
      )}
      <div className={styles['habits-modal__item']}>
        <h4 className={styles['habits-modal__item-title']}>
          {habit.targetValue ? 'Установить выполнение за сегодня:' : 'Установить выполнение:'}
        </h4>
        {habit.targetValue ? (
          <input type='text' value={inputValue} name="modal-input" autoComplete='text' className={styles['habits-modal__item-input']} onChange={(e) => setInputValue(e.target.value)}/>
        ) : (
          <div className={styles['habits-modal__checkbox-container']}>
            <input type="checkbox" checked={isChecked} name="modal-checkbox" autoComplete='checkbox' className={styles['habits-modal__checkbox-input']} onChange={() => {}} onClick={() => setIsChecked(!isChecked)} />
            <h4 className={styles['habits-modal__item-value']}>{isChecked ? 'Выполнено' : 'Не выполнено'}</h4>
          </div>
        )}
      </div>
      <div className={styles['habits-modal__buttons']}>
          <PrimaryButton text='Сохранить' icon={TfiSave} onClick={handleSaveHabit} />
          <PrimaryButton text='Перестать трекать' icon={RiEyeOffLine} onClick={handleStopHabit} />
        <PrimaryButton text='Перестать трекать и удалить историю' icon={FiTrash2} onClick={handleRemoveHabit} />
      </div>
    </div>
  )
}