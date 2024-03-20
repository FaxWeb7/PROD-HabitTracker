export const storeFormatDate = (date: Date): string => {
  return date.toISOString().split('.')[0]+'Z'
}

export const dateWithoutTime = (date: string): string => {
  return String(date).split('T')[0]
}