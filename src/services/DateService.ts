export class DateService {
  private static currentDate: string = localStorage.getItem('currentDate') || ''

  public static setCurrentDate(newCurrentDate: string): void {
    localStorage.setItem('currentDate', newCurrentDate)
    this.currentDate = newCurrentDate
  }

  public static getCurrentDate(): string {
    const storedDate: string = localStorage.getItem('currentDate') || ''
    this.currentDate = storedDate
    return this.currentDate
  }
}
