import { FC } from 'react';
import { useTitle } from '../../../hooks/useTitle';
import styles from './shop.module.scss';

export const Shop: FC = () => {
  useTitle('Магазин')

  return (
    <div className={styles.shop}>
      <div className="container">
        Shop
      </div>
    </div>
  )
}