import { FC } from 'react';
import { Link } from 'react-router-dom';
import { APP_URL } from '../../../constants/constants';
import { HeaderNav } from './HeaderNav/HeaderNav';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../store/user/user.slice';
import styles from './header.module.scss'

export const Header: FC = () => {
  const { name } = useSelector(selectUser)

  return (
    <header className='header'>
      <div className="container">
        <div className={styles['header__inner']}>
          <HeaderNav />
          <Link className={styles['header__profile']} to={'/profile'}>
            <h4 className={styles['header__profile-name']}>{name}</h4>
            <img className={styles['header__profile-avatar']} src={`${APP_URL}/images/avatar.png`} alt='avatar' />
          </Link>
        </div>
      </div>
    </header>
  )
}