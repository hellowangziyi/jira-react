import { useLocation } from 'react-router'
import { useProject } from '../../shared/hooks/use-projects'

export const useProjectIdinUrl = () => {
  const { pathname } = useLocation()
  const id = pathname.match(/projects\/(\d+)/)?.[1]
  return Number(id)
}

export const useCurProject = () => useProject(useProjectIdinUrl())

// const useProjectId = () => ({
//   projectId: useProjectIdinUrl()
// })
// export const useProjectParmas = ['projects', useProjectId()]
// const useKanbanId = () => ({
//   kanbanId: useProjectIdinUrl()
// })
// export const useTaskParmas = ['kanbans', useKanbanId()]
