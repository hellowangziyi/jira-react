export interface IUser {
  id: number
  name: string
  email?: string
  title?: string
  organization?: string
  token: string
}

export type IUserList = IUser[]
