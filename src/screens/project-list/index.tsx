import * as React from 'react'
import { useState, useEffect } from 'react'
import { ListScreen } from './list'
import { IProject, IProjectList } from '../../types/project'
import { IUser, IUserList } from '../../types/user'
import { useDebounce } from '../../shared/hooks/use-debounce'
import { useMount } from '../../shared/hooks/use-mount'
import { useHttp } from '../../api/http'
import { cleanObject } from '../../shared'
import { SearchPanel } from './search-panel'
import {
  ErrorTypography,
  LinkButton,
  ScreenContainer
} from '../../components/common/lib'
import { Row, Typography } from 'antd'
import { usePorjects } from '../../shared/hooks/use-projects'
import { useUsers } from '../../shared/hooks/use-users'
import { useDocumentTitle } from '../../shared/hooks/use-documentTitle'
import { useQueryParam } from '../../shared/hooks/use-query-param'

export interface IParam {
  name: string
  personId: string
}
export const ProjectListScreen = () => {
  // const [, setParam] = useState({
  //   name: '',
  //   personId: ''
  // })
  const [params, setParams] = useQueryParam(['name', 'personId'])
  const deBounceParam = useDebounce(params, 200)
  const { isLoading, error, data: list } = usePorjects(deBounceParam)
  const { data: users } = useUsers()
  useDocumentTitle('项目列表', false)

  return (
    <ScreenContainer>
      <Row justify={'space-between'}>
        <h1>项目列表</h1>
        <LinkButton>创建项目</LinkButton>
      </Row>
      {/* {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : (
        ''
      )} */}
      <ErrorTypography error={error}></ErrorTypography>
      <SearchPanel
        params={params}
        setParams={setParams}
        users={(users as IUser[]) || []}
      ></SearchPanel>
      <ListScreen
        users={(users as IUser[]) || []}
        list={list || []}
        loading={isLoading}
      ></ListScreen>
    </ScreenContainer>
  )
}
