export interface IProject {
  id: number
  name: string
  personId: number
  organization: string
  created: number
}

export type IProjectList = IProject[]
