import { Form, Input, Select } from 'antd'
import { IProject } from '../../types/project'
import { IParam } from '.'
import { IUser, IUserList } from '../../types/user'

interface SearchPanelProps {
  // param: Partial<Pick<IProject, 'name' | 'personId'>>
  param: IParam
  users: IUser[]
  setParam: (param: SearchPanelProps['param']) => void
}
export const SearchPanel = (props: SearchPanelProps) => {
  const { param, setParam, users } = props

  return (
    <Form>
      <Form.Item>
        <Input
          placeholder="项目名"
          type="text"
          value={param.name}
          onChange={(e) => setParam({ ...param, name: e.target.value })}
        ></Input>
      </Form.Item>
      <Form.Item>
        <Select placeholder="负责人">
          {/* <Select.Option value={'负责人'}>负责人</Select.Option> */}
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
