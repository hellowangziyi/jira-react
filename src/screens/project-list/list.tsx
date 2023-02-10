import { Table } from 'antd'
import { IProject, IProjectList } from '../../types/project'
import { IUser, IUserList } from '../../types/user'
import { ColumnsType } from 'antd/es/table'

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
      dataIndex: 'name'
    },
    {
      title: '部门',
      dataIndex: 'organization'
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
