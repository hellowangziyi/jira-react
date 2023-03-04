import { Form, Input, Select } from 'antd'
import { IProject } from '../../types/project'
import { IParam } from '.'
import { IUser, IUserList } from '../../types/user'

interface SearchPanelProps {
  // param: Partial<Pick<IProject, 'name' | 'personId'>>
  params: IParam
  users: IUser[]
  setParams: (param: SearchPanelProps['params']) => void
}
export const SearchPanel = (props: SearchPanelProps) => {
  const { params, setParams, users } = props

  return (
    <Form>
      <Form.Item>
        <Input
          placeholder="项目名"
          type="text"
          value={params.name}
          onChange={(e) => setParams({ ...params, name: e.target.value })}
        ></Input>
      </Form.Item>
      <Form.Item>
        <Select
          placeholder="负责人"
          onChange={(value: number) => {
            setParams({ ...params, personId: String(value) })
            console.log('1', { ...params, personId: String(value) })
          }}
        >
          <Select.Option value={''}>负责人</Select.Option>
          {users.map((item) => {
            return (
              <Select.Option value={item.id} key={item.id}>
                {item.name}
              </Select.Option>
            )
          })}
        </Select>
      </Form.Item>
    </Form>
  )
}
