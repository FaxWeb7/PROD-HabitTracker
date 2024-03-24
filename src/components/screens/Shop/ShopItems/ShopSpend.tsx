import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaCoins } from 'react-icons/fa6'
import { selectUser, userActions } from '@/store/user/user.slice'
import { selectCurrentDate } from '@/store/currentDate/currentDate.slice'
import { selectUploadData, uploadDataActions } from '@/store/uploadData/uploadData.slice'
import { countUserStats } from '@/helpers/CountUserStats'
import { skipDay } from '@/components/screens/Shop/SkipDay'
import { PrimaryButton } from '@/components/shared/PrimaryButton/PrimaryButton'
import styles from './shopitem.module.scss'

export const ShopSpend: FC = () => {
  const avatarForm = useForm<{ avatarBase64: Blob[] }>()
  const nameForm = useForm<{ name: string }>()
  const [isSkipError, setIsSkipError] = useState<boolean>(false)
  const { user } = useSelector(selectUser)
  const { currentDate } = useSelector(selectCurrentDate)
  const { uploadData } = useSelector(selectUploadData)
  const dispatch = useDispatch()

  const handleChangeAvatar: SubmitHandler<{ avatarBase64: Blob[] }> = (data) => {
    const imageFile = data.avatarBase64[0]
    const reader = new FileReader()
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const imageBase64 = event.target?.result
      dispatch(
        userActions.setUser({
          ...user,
          prodCoins: Number(user.prodCoins) - 400,
          avatarBase64: String(imageBase64)
        })
      )
    }
    reader.readAsDataURL(imageFile)
  }

  const handleChangeName: SubmitHandler<{ name: string }> = (data) => {
    dispatch(
      userActions.setUser({
        ...user,
        name: data.name,
        prodCoins: Number(user.prodCoins) - 150
      })
    )
  }

  const handleSkipDay = () => {
    if (Number(user.prodCoins) < 100) {
      setIsSkipError(true)
      return
    }
    const newUploadData = skipDay(uploadData, currentDate)
    const newUser = countUserStats({
      user,
      uploadData: newUploadData,
      currentDate
    })
    dispatch(uploadDataActions.setUploadData(newUploadData))
    dispatch(
      userActions.setUser({
        ...newUser,
        prodCoins: Number(newUser.prodCoins) - 100
      })
    )
  }

  return (
    <div className={styles['shop-item']}>
      <h3 className={styles['shop-item__title']}>Потратить ProdCoin:</h3>
      <ul role="list" className={styles['shop-item__cards']}>
        <li className={styles['shop-item__card']}>
          <div className={styles['shop-item__card-header']}>
            <div className={styles['shop-item__card-info']}>
              <FaCoins className={styles['shop-item__card-icon']} />
              <h5 className={styles['shop-item__card-amount']}>400</h5>
            </div>
            <h5 className={styles['shop-item__card-text']}>Изменить аватарку</h5>
          </div>
          <div className={styles['shop-item__card-main']}>
            <h5 className={styles['shop-item__card-subtext']}>Прикрепить файл: </h5>
            <div className={styles['shop-item__card-wrapper-input']}>
              <input
                type="file"
                id="file-avatar"
                className={`${styles['shop-item__card-input']} ${styles.file}`}
                accept="image/*"
                {...avatarForm.register('avatarBase64', {
                  required: 'Это поле обязательно!',
                  validate: {
                    validNumber: () => user.prodCoins >= 400 || 'У вас не хватает ProdCoin!'
                  }
                })}
              />
              <label htmlFor="file-avatar" className={`${styles['shop-item__card-input']} ${styles.custom}`}>
                Выбрать файл
              </label>
              {avatarForm.formState.errors.avatarBase64 && (
                <span className={styles['shop-item__card-error']}>{avatarForm.formState.errors.avatarBase64.message}</span>
              )}
            </div>
          </div>
          <PrimaryButton
            text="Изменить"
            type="submit"
            className={styles['shop-item__card-button']}
            onClick={avatarForm.handleSubmit(handleChangeAvatar)}
          />
        </li>
        <li className={styles['shop-item__card']}>
          <div className={styles['shop-item__card-header']}>
            <div className={styles['shop-item__card-info']}>
              <FaCoins className={styles['shop-item__card-icon']} />
              <h5 className={styles['shop-item__card-amount']}>150</h5>
            </div>
            <h5 className={styles['shop-item__card-text']}>Изменить имя</h5>
          </div>
          <div className={styles['shop-item__card-main']}>
            <h5 className={styles['shop-item__card-subtext']}>Введите новое имя: </h5>
            <div className={styles['shop-item__card-wrapper-input']}>
              <input
                type="text"
                autoComplete="text"
                className={styles['shop-item__card-input']}
                {...nameForm.register('name', {
                  required: 'Это поле обязательно!',
                  validate: {
                    validNumber: () => user.prodCoins >= 150 || 'У вас не хватает ProdCoin!'
                  }
                })}
              />
              {nameForm.formState.errors.name && <span className={styles['shop-item__card-error']}>{nameForm.formState.errors.name.message}</span>}
            </div>
          </div>
          <PrimaryButton
            text="Изменить"
            type="button"
            className={styles['shop-item__card-button']}
            onClick={nameForm.handleSubmit(handleChangeName)}
          />
        </li>
        <li className={styles['shop-item__card']}>
          <div className={styles['shop-item__card-header']}>
            <div className={styles['shop-item__card-info']}>
              <FaCoins className={styles['shop-item__card-icon']} />
              <h5 className={styles['shop-item__card-amount']}>100</h5>
            </div>
            <h5 className={styles['shop-item__card-text']}>Пропуск привычек на сегодня</h5>
          </div>
          <div className={styles['shop-item__card-main']}>
            <h5 className={styles['shop-item__card-subtext']}>(Пропускаются привычки на сегодя, и сохраняется рекорд)</h5>
            {isSkipError && <span className={styles['shop-item__card-error']}>У вас не хватает ProdCoin!</span>}
          </div>
          <PrimaryButton text="Пропустить" type="button" className={styles['shop-item__card-button']} onClick={handleSkipDay} />
        </li>
      </ul>
    </div>
  )
}
