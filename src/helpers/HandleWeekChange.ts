interface IHandleWeekChange {
  setWeekDates: React.Dispatch<React.SetStateAction<string[]>>;
  days: string[],
  currentDate: Date,
}

export const handleWeekChange = (weekData: IHandleWeekChange) => {
  const currentDay = weekData.currentDate.getDay()
  const startDate = new Date(weekData.currentDate.getFullYear(), weekData.currentDate.getMonth(), weekData.currentDate.getDate() - currentDay + 1);
  
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
    dates.push(date.toDateString().split(' ')[2]);
  }
  weekData.setWeekDates(dates)
}