import { Menu } from 'antd'
import { Route, Routes } from 'react-router'
import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Epic } from '../epic'
import { Kanban } from '../kanban'

const items = [
  { label: '看板', key: 'kanban' }, // 菜单项务必填写 key
  { label: '任务组', key: 'item-2' },
  {
    label: '子菜单',
    key: 'submenu',
    children: [{ label: '子菜单项', key: 'submenu-item-1' }]
  }
]

const onClick = () => {
  console.log('click')
}
export const ProjectScreen = () => {
  return (
    <>
      <Menu onClick={onClick} style={{ width: 256, padding: 10 }} mode="inline">
        <Menu.Item key={'kanban'}>
          <Link to={'kanban'}>看板</Link>
        </Menu.Item>
        <Menu.Item key={'epic'}>
          <Link to={'epic'}>任务组</Link>
        </Menu.Item>
      </Menu>
      {/* 路径不加/ 会自动加在路由后面 */}
      {/* <Link to={'kanban'}>kanban</Link>
      <Link to={'epic'}>epic</Link> */}
      <Routes>
        <Route path="kanban" element={<Kanban></Kanban>}></Route>
        <Route path="epic" element={<Epic></Epic>}></Route>
        <Route index element={<Kanban></Kanban>} />
      </Routes>
    </>
  )
}
