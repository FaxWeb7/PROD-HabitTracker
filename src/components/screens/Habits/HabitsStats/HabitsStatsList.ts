import { FaMedal } from "react-icons/fa";
import { BsFillLightningFill } from "react-icons/bs";
import { FaLevelUpAlt } from "react-icons/fa";
import { FaCoins } from "react-icons/fa6";
import { IUserStats } from "@/interfaces/interfaces";

export const HabitStatsList: IUserStats[][] = [
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