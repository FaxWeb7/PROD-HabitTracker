export class DateService {
    private static currentDate: string = localStorage.getItem("currentDate") || ''

    public static setCurrentDate(newCurrentDate: Date): void {
        const dateString = newCurrentDate.toLocaleString();
        localStorage.setItem('currentDate', dateString);
        this.currentDate = dateString
    }
    
    public static getCurrentDate(): string {
        const storedDate: string = localStorage.getItem('currentDate') || ''
        this.currentDate = storedDate
        return this.currentDate
    }
}