import { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HeaderNavList } from './HeaderNavList';
import { CgMenu } from "react-icons/cg";
import styles from './headernav.module.scss';

export const HeaderNav: FC = () => {
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false)
  const location = useLocation()

  return (
    <nav className={styles['nav']}>
      <button className={styles['nav__burger-button']} onClick={() => setIsMenuVisible(!isMenuVisible)}>
        <CgMenu className={styles['nav__burger-icon']} />
      </button>
      <ul className={isMenuVisible ? `${styles['nav__list']} ${styles['active']}` : styles['nav__list']}>
        {HeaderNavList.map((navItem, index) => (
          <li key={index}>
            <Link className={location.pathname == navItem.link ? `${styles['nav__item']} ${styles['active']}` : styles['nav__item']} to={navItem.link} onClick={() => setIsMenuVisible(false)}>
              <navItem.icon className={styles['nav__item-icon']} />
              <h4 className={styles['nav__item-text']}>{navItem.title}</h4>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}