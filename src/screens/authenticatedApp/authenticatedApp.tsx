import { Button } from 'antd'
import { useAuth } from '../../context/auth-context'
import styled from '@emotion/styled'
import { PageHeader } from '../../components/content/page-header'
import { ProjectListScreen } from '../project-list'
import { Route, Routes } from 'react-router'
import { ProjectScreen } from '../project'

export default function AuthenticateApp() {
  return (
    <Container>
      <PageHeader></PageHeader>
      <Main>
        <Routes>
          <Route path="/projects" element={<ProjectListScreen />}></Route>
          <Route
            path="/projects/:projectId/*"
            element={<ProjectScreen />}
          ></Route>
        </Routes>
        {/* <div>我已经登陆了！</div>
        <Button onClick={() => logout()} type={'primary'}>
          退出登陆
        </Button> */}
      </Main>
    </Container>
  )
}

const Container = styled('div')`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`

const Main = styled('main')`
  display: flex;
  height: calc(100vh - 6rem);
  overflow: hidden;
`
