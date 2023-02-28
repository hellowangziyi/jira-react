import styled from '@emotion/styled'
import { PageHeader } from '../../components/content/page-header'
import { ProjectListScreen } from '../project-list'
import { Route, Routes, Navigate } from 'react-router'
// import { Navigate } from 'react-router-dom'

import { ProjectScreen } from '../project'
import { useState } from 'react'
import { ProjectModal } from '../project-list/projectModel'

export default function AuthenticateApp() {
  const [projectModalOpen, setProjectModalOpen] = useState(false)
  return (
    <Container>
      <PageHeader setProjectModalOpen={setProjectModalOpen}></PageHeader>
      <Main>
        <Routes>
          <Route
            path="/projects"
            element={
              <ProjectListScreen setProjectModalOpen={setProjectModalOpen} />
            }
          ></Route>
          <Route
            path="/projects/:projectId/*"
            element={<ProjectScreen />}
          ></Route>
          <Route path="/" element={<Navigate to="/projects" />} />
          {/* <Navigate to={'/projects'} replace={true}></Navigate> */}
        </Routes>
        {/* <div>我已经登陆了！</div>
        <Button onClick={() => logout()} type={'primary'}>
          退出登陆
        </Button> */}
      </Main>
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      ></ProjectModal>
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
