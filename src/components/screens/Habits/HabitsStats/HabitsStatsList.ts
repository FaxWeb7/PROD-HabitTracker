import { FaMedal } from "react-icons/fa";
import { BsFillLightningFill } from "react-icons/bs";
import { FaLevelUpAlt } from "react-icons/fa";
import { FaCoins } from "react-icons/fa6";
import { IconType } from "react-icons";

interface IHabitStats {
  icon: IconType
  text: string
}

export const HabitStatsList: IHabitStats[][] = [
  [
    {
      icon: FaMedal,
      text: 'Уровень',
    },
    {
      icon: BsFillLightningFill,
      text: 'Рекорд',
    },
  ],
  [
    {
      icon: FaLevelUpAlt,
      text: 'Опыт',
    },
    {
      icon: FaCoins,
      text: 'ProdCoin',
    }
  ]
]