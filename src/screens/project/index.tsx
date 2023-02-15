import { Route, Routes } from 'react-router'
import { Link } from 'react-router-dom'
import { Epic } from '../epic'
import { Kanban } from '../kanban'

export const ProjectScreen = () => {
  return (
    <>
      <h1>PROject</h1>
      {/* 路径不加/ 会自动加在路由后面 */}
      <Link to={'kanban'}>kanban</Link>
      <Link to={'epic'}>epic</Link>
      <Routes>
        <Route path="kanban" element={<Kanban></Kanban>}></Route>
        <Route path="epic" element={<Epic></Epic>}></Route>
      </Routes>
    </>
  )
}
