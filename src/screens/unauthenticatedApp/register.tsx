import { Form, Input } from 'antd'
import React, { FormEvent, Fragment } from 'react'

import { LongButton } from '../../components/common/lib'
import { useAuth } from '../../context/auth-context'
import { IAuthForm } from '../../types/form'
import { useAsync } from '../../shared/hooks/use-async'

interface registerScreenProps {
  onError: (error: Error) => void
}
export const RegisterScreen = ({ onError }: registerScreenProps) => {
  const { register } = useAuth()
  const { run, isLoading } = useAsync()
  const handleSubmit = ({ cpassword, ...result }: IAuthForm) => {
    if (cpassword !== result.password) {
      onError(new Error('请确认两次输入密码相同'))
    }
    run(register(result)).catch((e) => onError(e))
  }

  return (
    <Fragment>
      {/* <span>登陆名{user ? user.name : ''}</span> */}
      <Form onFinish={handleSubmit} labelCol={{ span: 6 }}>
        <Form.Item label="用户名" name="username">
          <Input
            placeholder="Please enter username"
            type="text"
            id={'username'}
          />
        </Form.Item>
        <Form.Item label="密码" name="password">
          <Input
            placeholder="Please enter password"
            type="password"
            id="password"
          />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="cpassword"
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  onError(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  )
                )
              }
            })
          ]}
        >
          <Input
            placeholder="Please confirm password"
            type="password"
            id="cpassword"
          />
        </Form.Item>
        <LongButton type="primary" htmlType="submit" loading={isLoading}>
          register
        </LongButton>
      </Form>
    </Fragment>
  )
}
