export const changeDaysInWeek = (currentDate: string, n: number) => {
  const parts = currentDate.split('.');
  const day = parseInt(parts[0]);
  let month = parseInt(parts[1]) - 1;
  let year = parseInt(parts[2]);

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

  const newDate = new Date(year, month, n);
  return newDate;
}