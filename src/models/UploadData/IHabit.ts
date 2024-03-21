export interface IHabit {
    id: number
    title: string
    category: string
    addDate: string
    period: string
    targetValue?: number
    stoppedDate?: string
}