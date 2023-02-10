export interface IProject {
  id: number
  name: string
  personId: string
  organization: string
  created: number
}

export type IProjectList = IProject[]
