import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CgMenu } from 'react-icons/cg'
import { useOutside } from '@/hooks/useOutisde'
import { HeaderNavList } from './HeaderNavList'
import styles from './headernav.module.scss'

export const HeaderNav: FC = () => {
  const { ref, isShow, setIsShow } = useOutside(false)
  const location = useLocation()

  return (
    <nav className={styles['nav']} ref={ref}>
      <button className={styles['nav__burger-button']} onClick={() => setIsShow(!isShow)}>
        <CgMenu className={styles['nav__burger-icon']} />
      </button>
      <ul className={isShow ? `${styles['nav__list']} ${styles['active']}` : styles['nav__list']}>
        {HeaderNavList.map((navItem, index) => (
          <li key={index}>
            <Link
              className={location.pathname == navItem.link ? `${styles['nav__item']} ${styles['active']}` : styles['nav__item']}
              to={navItem.link}
              onClick={() => setIsShow(false)}
            >
              <navItem.icon className={styles['nav__item-icon']} />
              <h4 className={styles['nav__item-text']}>{navItem.title}</h4>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
