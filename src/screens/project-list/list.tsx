import React from 'react'
import { Dropdown, Popover, Table } from 'antd'
import { IProject, IProjectList } from '../../types/project'
import { IUser } from '../../types/user'
import { ColumnsType } from 'antd/es/table'
import { Link } from 'react-router-dom'
import { Pin } from '../../components/common/pin'
import { useEditProject } from '../../shared/hooks/use-projects'
import { LinkButton } from '../../components/common/lib'
import type { MenuProps } from 'antd'
import { useDispatch } from 'react-redux'
import { projectSliceActions } from '../../store/features/projectSlice'
interface IPropsType {
  list: IProjectList
  users: IUser[]
  loading: boolean
  refresh: () => void
}

export const ListScreen = (props: IPropsType) => {
  const { list, users, loading, refresh } = props
  const { mutate } = useEditProject()
  const dispatch = useDispatch()
  const items: MenuProps['items'] = [
    {
      label: '编辑',
      key: 'edit',
      onClick: () => {
        dispatch(projectSliceActions.openProjectModel)
      }
    }
  ]
  const columns: ColumnsType<IProject> = [
    {
      title: <Pin checked={true} disabled={true}></Pin>,
      render: (_, project) => {
        return (
          <Pin
            checked={project.pin}
            onCheckedChange={(pin) =>
              mutate({ id: project.id, pin }).then(refresh)
            }
          ></Pin>
        )
      }
    },
    // {
    //   title: 'id',
    //   dataIndex: 'id'
    // },
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
    },
    {
      render() {
        const contentStyle = {
          width: '8rem',
          textAlign: 'center'
        }
        return (
          <Dropdown menu={{ items }}>
            <LinkButton>...</LinkButton>
          </Dropdown>
        )
      }
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
