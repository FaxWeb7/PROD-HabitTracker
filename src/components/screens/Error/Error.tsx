import { FC } from 'react'
import { useTitle } from '../../../hooks/useTitle'
import styles from './error.module.scss'

export const Error: FC = () => {
  useTitle('404')

  return (
    <div className={styles['error']}>
      <div className="container">
        <div className={styles['error__inner']}>
          <h1 className={styles['error-title']}>404</h1>
          <h2 className={styles['error-text']}>Такой страницы нет</h2>
        </div>
      </div>
    </div>
  )
}
