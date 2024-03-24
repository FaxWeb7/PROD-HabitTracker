export interface IUser {
  name: string
  level: number
  currentExperience: number
  maxExperience: number
  currentStreak: number
  maxStreak: number
  prodCoins: number
  isGitSub?: boolean
  isInviteFriend?: boolean
  spendedExperience?: number
  avatarBase64?: string
}

export interface IUserStore {
  user: IUser
}
