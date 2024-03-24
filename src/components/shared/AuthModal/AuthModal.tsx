import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useForm, SubmitHandler } from 'react-hook-form'
import { IoSend } from 'react-icons/io5'
import { userActions } from '@/store/user/user.slice'
import { IUser } from '@/models/User/IUser'
import { IAuthFormInputs } from '@/interfaces/interfaces'
import { PrimaryButton } from '../PrimaryButton/PrimaryButton'
import styles from './authmodal.module.scss'

interface IAuthModalProps {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthModal: FC<IAuthModalProps> = ({ setIsAuth }: IAuthModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IAuthFormInputs>()
  const dispatch = useDispatch()

  const onSubmit: SubmitHandler<IAuthFormInputs> = (data) => {
    const initialUserVal: IUser = {
      name: data.name,
      level: 1,
      currentExperience: 0,
      maxExperience: 0,
      currentStreak: 0,
      maxStreak: 0,
      prodCoins: data.randomNum
    }
    dispatch(userActions.setUser(initialUserVal))
    setIsAuth(true)
  }

  return (
    <div className={styles.modal}>
      <div className={`${styles['modal__container']} container`}>
        <div className={styles['modal__inner']}>
          <form role="form" className={styles['modal__form']} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={styles['modal__form-title']}>Заполните ваши данные</h2>
            <input
              type="text"
              id="name-input"
              autoComplete="name"
              className={styles['modal__form-input']}
              placeholder="Имя"
              {...register('name', { required: true })}
            />
            {errors.name && <span className={styles['modal__form-error']}>Это поле обязательно!</span>}
            <input
              type="text"
              id="random-num-input"
              autoComplete="random-num"
              className={styles['modal__form-input']}
              placeholder="Рандомное число от 1 до 100"
              {...register('randomNum', {
                required: 'Это поле обязательно!',
                validate: {
                  validNumber: (value) => (value >= 1 && value <= 100) || 'Введите число от 1 до 100'
                }
              })}
            />
            {errors.randomNum && <span className={styles['modal__form-error']}>{errors.randomNum.message}</span>}
            <PrimaryButton text="Готово" icon={IoSend} className={styles['modal__form-submit']} type="submit" />
          </form>
        </div>
      </div>
    </div>
  )
}
