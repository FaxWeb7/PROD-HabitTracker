export interface IHabit {
    id: number
    title: string
    category: string
    addDate: Date | string
    period: string
    targetValue?: number
    stoppedDate?: Date
}