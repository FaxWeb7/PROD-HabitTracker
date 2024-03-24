import { FC } from 'react'
import { FaGithub } from 'react-icons/fa'
import styles from './footer.module.scss'

export const Footer: FC = () => {
  return (
    <footer className={`footer ${styles.footer}`}>
      <div className="container">
        <div className={styles['footer__inner']}>
          <h5 className={styles['footer__rights']}>© 2024 Трекер привычек™</h5>
          <a className={styles['footer__link']} href="https://github.com/FaxWeb7" target="_blank">
            <FaGithub className={styles['footer__link-icon']} />
            <h5 className={styles['footer__link-text']}>FaxWeb7</h5>
          </a>
        </div>
      </div>
    </footer>
  )
}
