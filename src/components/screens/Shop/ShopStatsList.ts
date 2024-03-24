import { FaLevelUpAlt } from 'react-icons/fa'
import { FaCoins } from 'react-icons/fa6'
import { IUserStats } from '@/interfaces/interfaces'

export const ShopStatsList: IUserStats[][] = [
  [
    {
      icon: FaCoins,
      text: 'ProdCoin'
    }
  ],
  [
    {
      icon: FaLevelUpAlt,
      text: 'Опыт'
    }
  ]
]
