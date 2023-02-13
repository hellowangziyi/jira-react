import { Table } from 'antd'
import { IProject, IProjectList } from '../../types/project'
import { IUser, IUserList } from '../../types/user'
import { ColumnsType } from 'antd/es/table'
import { Link } from 'react-router-dom'
interface IPropsType {
  list: IProjectList
  users: IUser[]
  loading: boolean
}
export const ListScreen = (props: IPropsType) => {
  const { list, users, loading } = props
  const columns: ColumnsType<IProject> = [
    {
      title: 'id',
      dataIndex: 'id'
    },
    {
      title: '名称',
      render: (_, project) => {
        return <Link to={String(project.id)}>{project.name}</Link>
      }
    },
    {
      title: '部门',
      dataIndex: 'organization'
    },
    {
      title: '负责人',
      render: (_, project) => {
        const res = users.find((user) => user.id === Number(project.personId))
        return res?.name
      }
    },
    {
      title: '创建时间',
      dataIndex: 'created'
    }
  ]
  return (
    <Table
      className="list"
      rowKey="id"
      pagination={false}
      columns={columns}
      dataSource={list}
      loading={loading}
    ></Table>
  )
}
