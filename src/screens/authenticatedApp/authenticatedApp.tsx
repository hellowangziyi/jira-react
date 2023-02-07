import { Button } from 'antd'
import { useAuth } from '../../context/auth-context'
import styled from '@emotion/styled'
import { PageHeader } from '../../components/content/page-header'
import { ProjectListScreen } from '../project-list'
export default function AuthenticateApp() {
  const { logout, user } = useAuth()
  return (
    <Container>
      <PageHeader></PageHeader>
      <Main>
        <ProjectListScreen></ProjectListScreen>
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
