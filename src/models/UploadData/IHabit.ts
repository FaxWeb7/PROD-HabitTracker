export interface IHabit {
    id: number
    title: string
    category: string
    addDate: Date
    period: 'daily' | 'weekly' | 'monthly'
    targetValue?: number
}