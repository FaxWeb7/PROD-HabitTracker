import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select, { SingleValue } from 'react-select'
import { useForm, SubmitHandler } from "react-hook-form"
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { VscDiffAdded } from "react-icons/vsc";
import { selectUser } from '../../../../store/user/user.slice';
import { selectUploadData, uploadDataActions } from '../../../../store/uploadData/uploadData.slice';
import { selectCurrentDate } from '../../../../store/currentDate/currentDate.slice';
import { IHabit } from '../../../../models/UploadData/IHabit';
import { IAddHabitInputs } from '../../../../interfaces/interfaces';
import { getMaxHabitId } from '../../../../helpers/Habits/GetMaxHabitId';
import { PrimaryButton } from '../../../shared/PrimaryButton/PrimaryButton';
import { createGroupedOptions, IGroupedOption, IOption } from './CreateGroupedOptions';
import styles from './habitaddmodal.module.scss';

interface IHabitAddModalProps {
  setIsModalShow: React.Dispatch<React.SetStateAction<boolean>>
}



export const HabitAddModal: FC<IHabitAddModalProps> = ({ setIsModalShow }: IHabitAddModalProps) => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<IAddHabitInputs>()
  const { user } = useSelector(selectUser)
  const { currentDate } = useSelector(selectCurrentDate)
  const { uploadData } = useSelector(selectUploadData)
  const groupedOptions = createGroupedOptions(user.level)
  const [selectedOption, setSelectedOption] = useState<SingleValue<IOption>>(groupedOptions[1].options[0])
  const [isCountable, setIsCountable] = useState<boolean>(false) 
  const dispatch = useDispatch()


  const handleAddHabit: SubmitHandler<IAddHabitInputs> = (data) => {
    let newHabit: IHabit = {
      id: getMaxHabitId([...uploadData.habits])+1,
      title: data.title,
      category: data.category,
      addDate: currentDate,
      period: data.period
    }
    if (data.targetValue) newHabit = {...newHabit, targetValue: Number(data.targetValue)}
    dispatch(uploadDataActions.setUploadData({habits: [...uploadData.habits, newHabit], actions: uploadData.actions}))
    setIsModalShow(false)
  }

  const handleAddExistingHabit: React.MouseEventHandler<HTMLButtonElement> = () => {
    let newHabit: IHabit = {
      id: getMaxHabitId([...uploadData.habits])+1,
      title: selectedOption?.label || '',
      category: selectedOption?.category || '',
      addDate: currentDate,
      period: selectedOption?.period || ''
    }
    if (selectedOption?.targetValue) newHabit = {...newHabit, targetValue: Number(selectedOption.targetValue)}
    dispatch(uploadDataActions.setUploadData({habits: [...uploadData.habits, newHabit], actions: uploadData.actions}))
    setIsModalShow(false)
  }

  const handleChangeForm = () => {
    setIsCountable(getValues().countable === 'countable' ? true : false)
  }

  return (
    <div className={styles['habits-modal']}>
      <button className={styles['habits-modal__close']} onClick={() => setIsModalShow(false)}>
        <IoIosCloseCircleOutline className={styles['habits-modal__close-icon']} />
      </button>
      <h1 className={styles['habits-modal__title']}>Новая привычка</h1>
      <div className={styles['habits-modal__select']}>
        <h3 className={styles['habits-modal__select-title']}>Выберите привычку:</h3>
        <Select<IOption, false, IGroupedOption>
          onChange={(option: SingleValue<IOption>) => setSelectedOption(option)}
          defaultValue={groupedOptions[1].options[0]}
          options={groupedOptions}
          isSearchable={false}
          formatGroupLabel={(data: IGroupedOption) => 
            <div>
              {user.level >= data.demandLevel ? (
                <span>{data.label ? `${data.label} (${data.options.length})` : ''}</span>
              ) : (
                <span>Категория "{data.label}" откроется на {data.demandLevel} уровне</span>
              )}
            </div>
          }
        />
      </div>
      {selectedOption?.value === 'self' ? (
        <form role='form' className={styles['habits-modal__form']} onSubmit={handleSubmit(handleAddHabit)} onChange={() => handleChangeForm()}>
          <div className={styles['habits-modal__item']}>
            <label htmlFor="title-input" className={styles['habits-modal__item-title']}>Название:</label>
            <input id='title-input' autoComplete='title' className={styles['habits-modal__item-input']} {...register("title", { required: true })} />
            {errors.title && <span className={styles['habits-modal__form-error']}>Это поле обязательно!</span>}
          </div>
          <div className={styles['habits-modal__item']}>
            <label htmlFor="category-input" className={styles['habits-modal__item-title']}>Категория:</label>
            <input id='category-input' autoComplete='category' className={styles['habits-modal__item-input']} {...register("category", { required: true })} />
            {errors.category && <span className={styles['habits-modal__form-error']}>Это поле обязательно!</span>}
          </div>
          <div className={styles['habits-modal__item']}>
            <label htmlFor="period-select" className={styles['habits-modal__item-title']}>Период:</label>
            <select id="period-select" className={styles['habits-modal__item-input']} {...register("period", { required: true })}>
              <option value="daily">День</option>
              <option value="weekly">Неделя</option>
              <option value="monthly">Месяц</option>
            </select>
            {errors.period && <span className={styles['habits-modal__form-error']}>Это поле обязательно!</span>}
          </div>
          <div className={styles['habits-modal__item']}>
            <label htmlFor="countable-select" className={styles['habits-modal__item-title']}>Цель привычки:</label>
            <select id="countable-select" className={styles['habits-modal__item-input']} {...register("countable", { required: true })}>
              <option value="uncountable">Неисчисляемая</option>
              <option value="countable">Исчисляемая</option>
            </select>
            {errors.countable && <span className={styles['habits-modal__form-error']}>Это поле обязательно!</span>}
          </div>
          {isCountable && (
            <div className={styles['habits-modal__item']}>
              <label htmlFor="countable-select" className={styles['habits-modal__item-title']}>Значение цели (число):</label>
              <input autoComplete='target-value' className={styles['habits-modal__item-input']} {...register("targetValue", { required: true })} />
              {errors.targetValue && <span className={styles['habits-modal__form-error']}>Это поле обязательно!</span>}
            </div>
          )}
          <PrimaryButton text='Создать привычку' icon={VscDiffAdded} className={styles['habits-modal__submit']} type='submit' />
        </form>
      ) : (
        <PrimaryButton text='Создать привычку' icon={VscDiffAdded} className={styles['habits-modal__submit']} onClick={handleAddExistingHabit} type='submit' />
      )}
    </div>
  )
}