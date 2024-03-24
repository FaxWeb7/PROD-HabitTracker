import { FC } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '@/store/user/user.slice'
import { APP_URL } from '@/constants/constants'
import { HeaderNav } from './HeaderNav/HeaderNav'
import styles from './header.module.scss'

export const Header: FC = () => {
  const { user } = useSelector(selectUser)

  return (
    <header className="header">
      <div className="container">
        <div className={styles['header__inner']}>
          <HeaderNav />
          <div className={styles['header__profile']}>
            <h4 className={styles['header__profile-name']}>{user.name}</h4>
            <img
              className={styles['header__profile-avatar']}
              src={user.avatarBase64 ? user.avatarBase64 : `${APP_URL}/images/avatar.png`}
              alt="avatar"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
