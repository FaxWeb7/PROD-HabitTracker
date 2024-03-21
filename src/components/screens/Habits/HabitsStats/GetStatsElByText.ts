import { IUser } from "../../../../models/User/IUser";

export const getStatsElByText = (statsItemText: string, user: IUser) => {
  let valueToDisplay
  switch (statsItemText) {
    case 'Уровень':
      valueToDisplay = user.level;
      break;
    case 'Рекорд':
      valueToDisplay = user.currentStreak;
      break;
    case 'Опыт':
      valueToDisplay = user.currentExperience;
      break;
    default:
      valueToDisplay = user.prodCoins;
  }
  return valueToDisplay
}