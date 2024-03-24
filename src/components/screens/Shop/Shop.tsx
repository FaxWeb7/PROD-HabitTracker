import { FC } from 'react';
import { useTitle } from '../../../hooks/useTitle';
import { UserStats } from '@/components/shared/UserStats/UserStats';
import { ShopStatsList } from './ShopStatsList';
import { ShopEarn } from './ShopItems/ShopEarn';
import { ShopSpend } from './ShopItems/ShopSpend';
import styles from './shop.module.scss';

export const Shop: FC = () => {
  useTitle('Магазин')

  return (
    <div className={styles.shop}>
      <div className="container">
        <div className={styles['shop__inner']}>
          <UserStats statsList={ShopStatsList} />
          <ShopEarn />
          <ShopSpend />
        </div>
      </div>
    </div>
  )
}