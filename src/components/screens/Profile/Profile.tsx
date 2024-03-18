import { FC } from 'react';
import { useTitle } from '../../../hooks/useTitle';
import styles from './profile.module.scss';

export const Profile: FC = () => {
  useTitle('Профиль')

  return (
    <div className={styles.profile}>
      <div className="container">
        Profile
      </div>
    </div>
  )
}