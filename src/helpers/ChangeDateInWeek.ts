import { dateWithoutTime, storeFormatDate } from "./ChangeDateFormat";

export const changeDaysInWeek = (currentDate: string, n: number) => {
  const parts = dateWithoutTime(currentDate).split('-')
  const day = Number(parts[2])
  let month = Number(parts[1]) - 1
  let year = Number(parts[0])
  
  if (n-day > 15){
    month -= 1
    if (month === -1){
      year -= 1
      month = 11
    }  
  } else if (n-day < -15){
    month += 1
    if (month == 12){
      year += 1
      month = 0
    }
  }
  
  return storeFormatDate(new Date(year, month, n+1))
}