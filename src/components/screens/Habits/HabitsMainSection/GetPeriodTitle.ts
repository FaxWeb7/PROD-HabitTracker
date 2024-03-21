export const getPeriodTitle = (period: string): string => {
  let periodTitle = ''
  if (period === 'monthlyHabits') {
    periodTitle = 'месяц'
  } else if (period === 'weeklyHabits'){
    periodTitle = 'неделю'
  } else {
    periodTitle = 'день'
  }
  return periodTitle
}