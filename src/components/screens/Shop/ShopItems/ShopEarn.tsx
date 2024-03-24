import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaCoins } from 'react-icons/fa6'
import { selectUser, userActions } from '@/store/user/user.slice'
import { PrimaryButton } from '@/components/shared/PrimaryButton/PrimaryButton'
import styles from './shopitem.module.scss'

export const ShopEarn: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<{ exchangeValue: number }>()
  const { user } = useSelector(selectUser)
  const dispatch = useDispatch()

  const handleSubscribe = () => {
    dispatch(userActions.setUser({ ...user, prodCoins: Number(user.prodCoins) + 80, isGitSub: true }))
  }

  const handleInvite = () => {
    dispatch(userActions.setUser({ ...user, prodCoins: Number(user.prodCoins) + 40, isInviteFriend: true }))
  }

  const handleExchange: SubmitHandler<{ exchangeValue: number }> = (data) => {
    dispatch(
      userActions.setUser({
        ...user,
        prodCoins: Number(user.prodCoins) + Number(Math.floor(data.exchangeValue * 0.06)),
        currentExperience: user.currentExperience - data.exchangeValue,
        spendedExperience: (user.spendedExperience || 0) + Number(data.exchangeValue)
      })
    )
  }

  return (
    <div className={styles['shop-item']}>
      <h3 className={styles['shop-item__title']}>Заработать ProdCoin:</h3>
      <ul role="list" className={styles['shop-item__cards']}>
        <li className={styles['shop-item__card']}>
          <div className={styles['shop-item__card-header']}>
            <div className={styles['shop-item__card-info']}>
              <FaCoins className={styles['shop-item__card-icon']} />
              <h5 className={styles['shop-item__card-amount']}>80</h5>
            </div>
            <h5 className={styles['shop-item__card-text']}>Подписаться на GitHub разработчика</h5>
          </div>
          <div className={styles['shop-item__card-main']}>
            <h5 className={styles['shop-item__card-subtext']}>Ссылка на GitHub: </h5>
            <a href="https://github.com/FaxWeb7" target="_blank" className={styles['shop-item__card-link']}>
              github.com/FaxWeb7
            </a>
          </div>
          <PrimaryButton
            text={user.isGitSub ? 'Выполнено' : 'Готово'}
            type="button"
            className={styles['shop-item__card-button']}
            disabled={user.isGitSub}
            onClick={handleSubscribe}
          />
        </li>
        <li className={styles['shop-item__card']}>
          <div className={styles['shop-item__card-header']}>
            <div className={styles['shop-item__card-info']}>
              <FaCoins className={styles['shop-item__card-icon']} />
              <h5 className={styles['shop-item__card-amount']}>40</h5>
            </div>
            <h5 className={styles['shop-item__card-text']}>Пригласить друга</h5>
          </div>
          <div className={styles['shop-item__card-main']}>
            <h5 className={styles['shop-item__card-subtext']}>Реферальная ссылка: </h5>
            <h5
              className={`${styles['shop-item__card-link']} ${styles.ref}`}
              onClick={() => navigator.clipboard.writeText('https://frontend-fax-web7.vercel.app/')}
            >
              frontend-fax-web7.vercel.app/
            </h5>
          </div>
          <PrimaryButton
            text={user.isInviteFriend ? 'Выполнено' : 'Готово'}
            type="button"
            className={styles['shop-item__card-button']}
            disabled={user.isInviteFriend}
            onClick={handleInvite}
          />
        </li>
        <li className={styles['shop-item__card']}>
          <div className={styles['shop-item__card-header']}>
            <div className={styles['shop-item__card-info']}>
              <FaCoins className={styles['shop-item__card-icon']} />
              <h5 className={styles['shop-item__card-amount']}>∞</h5>
            </div>
            <h5 className={styles['shop-item__card-text']}>Обменять опыт, 1 ProdCoin = 17 опыта</h5>
          </div>
          <div className={styles['shop-item__card-main']}>
            <h5 className={styles['shop-item__card-subtext']}>Введите кол-во опыта для обмена: </h5>
            <div className={styles['shop-item__card-wrapper-input']}>
              <input
                type="text"
                className={styles['shop-item__card-input']}
                {...register('exchangeValue', {
                  required: 'Это поле обязательно!',
                  validate: {
                    validNumber: (value) => (value >= 1 && value <= user.currentExperience) || 'У вас нет столько опыта('
                  }
                })}
              />
              {errors.exchangeValue && <span className={styles['shop-item__card-error']}>{errors.exchangeValue.message}</span>}
            </div>
          </div>
          <PrimaryButton text="Обменять" type="submit" className={styles['shop-item__card-button']} onClick={handleSubmit(handleExchange)} />
        </li>
      </ul>
    </div>
  )
}
