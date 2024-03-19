import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, SubmitHandler } from "react-hook-form"
import { IUser } from '../../../models/User/IUser';
import { userActions } from '../../../store/user/user.slice';
import styles from './authmodal.module.scss';
import { PrimaryButton } from '../PrimaryButton/PrimaryButton';
import { IoSend } from 'react-icons/io5';

interface IAuthModalProps {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
}

interface Inputs {
  name: string
  color: string
}

export const AuthModal: FC<IAuthModalProps> = ({ setIsAuth }: IAuthModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const dispatch = useDispatch()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const initialUserVal: IUser = { name: data.name, level: 1, currentExperience: 0, maxExperience: 0, currentStreak: 0, maxStreak: 0, prodCoins: 10 }
    dispatch(userActions.setUser(initialUserVal))
    setIsAuth(true)
  }
  return (
    <div className={styles.modal}>
      <div className={`${styles['modal__container']} container`}>
        <div className={styles['modal__inner']}>
          <form className={styles['modal__form']} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={styles['modal__form-title']}>Заполните ваши данные</h2>
            <input autoComplete='name' className={styles['modal__form-input']} placeholder='Имя' {...register("name", { required: true })} />
            {errors.name && <span className={styles['modal__form-error']}>Это поле обязательно!</span>}
            <input autoComplete='color' className={styles['modal__form-input']} placeholder='Любимый цвет' {...register("color", { required: true })} />
            {errors.color && <span className={styles['modal__form-error']}>Это поле обязательно!</span>}
            <PrimaryButton text='Готово' icon={IoSend} className={styles['modal__form-submit']} type="submit" />
          </form>
        </div>
      </div>
    </div>
  )
}