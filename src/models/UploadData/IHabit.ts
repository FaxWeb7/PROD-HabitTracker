export interface IHabit {
    id: number
    title: string
    category: string
    addDate: Date
    period: string
    targetValue?: number
    stoppedDate?: Date
}