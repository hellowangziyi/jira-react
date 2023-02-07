import * as React from 'react'
import { useState, useEffect } from 'react'
import { ListScreen } from './list'
import { IProject, IProjectList } from '../../types/project'
import { IUserList } from '../../types/user'
import { useDebounce } from '../../shared/hooks/use-debounce'
import { useMount } from '../../shared/hooks/use-mount'
import { useHttp } from '../../api/http'
import { cleanObject } from '../../shared'
import { SearchPanel } from './search-panel'
import { LinkButton, ScreenContainer } from '../../components/common/lib'
import { Row } from 'antd'

export interface IParam {
  name: string
  personId: string
}
export const ProjectListScreen = () => {
  const [list, setList] = useState<IProjectList>([])
  const [users, setUsers] = useState<IUserList>([])
  const [param, setParam] = useState<IParam>({
    name: '',
    personId: ''
  })
  const deBounceParam = useDebounce(param, 200)
  const client = useHttp()

  useEffect(() => {
    client('/projects', { data: cleanObject(deBounceParam) }).then(setList)
  }, [deBounceParam])

  useMount(() => {
    client('/users').then(setUsers)
  })
  return (
    <ScreenContainer>
      <Row justify={'space-between'}>
        <h1>项目列表</h1>
        <LinkButton>创建项目</LinkButton>
      </Row>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users}
      ></SearchPanel>
      <ListScreen user={users} list={list}></ListScreen>
    </ScreenContainer>
  )
}
