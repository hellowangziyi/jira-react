export interface IProject {
  id: number
  name: string
  personId: string
  organization: string
  created: number
  pin: boolean
}

export type IProjectList = IProject[]
