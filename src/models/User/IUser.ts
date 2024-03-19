export interface IUser {
    name: string
    level: number
    currentExperience: number
    maxExperience: number
    currentStreak: number
    maxStreak: number
    prodCoins: number
}

export interface IUserStore {
    user: IUser
}