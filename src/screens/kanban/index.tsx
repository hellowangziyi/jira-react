import styled from '@emotion/styled'
import { Input, Select } from 'antd'
import { useQueryClient } from 'react-query'
import { ScreenContainer } from '../../components/common/lib'
import { useDocumentTitle } from '../../shared/hooks/use-documentTitle'
import { useKanBans } from '../../shared/hooks/use-kanban'
import { useQueryParam } from '../../shared/hooks/use-query-param'
import { IKanban } from '../../types/kanban'
import { AddKanban } from './addKanban'
import { KanbanCol } from './kanbanCol'
import { KanbanSearch } from './kanbanSearch'
import { useCurProject, useProjectIdinUrl } from './utils'

export const Kanban = () => {
  useDocumentTitle('看板列表')
  const { data: kanbans } = useKanBans()
  const { data: curProject } = useCurProject()
  return (
    <ScreenContainer>
      <h2>{curProject?.name}看板</h2>
      <KanbanSearch></KanbanSearch>
      <KanbansColContainer>
        {kanbans?.map((kanban: IKanban) => (
          <KanbanCol key={kanban.id} kanban={kanban}></KanbanCol>
        ))}
        <AddKanban></AddKanban>
      </KanbansColContainer>
    </ScreenContainer>
  )
}

const KanbansContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const KanbansColContainer = styled.div`
  display: flex;
  height: 100%;
`
