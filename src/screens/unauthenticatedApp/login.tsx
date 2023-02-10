import { Button, Form, Input } from 'antd'
import React, { FormEvent, Fragment } from 'react'

import { LongButton } from '../../components/common/lib'
import { useAuth } from '../../context/auth-context'
import { IAuthForm } from '../../types/form'
import { useAsync } from '../../shared/hooks/use-async'

interface ILoginScreenProps {
  onError: (error: Error) => void
}
export const LoginScreen = ({ onError }: ILoginScreenProps) => {
  const { login } = useAuth()
  const { run, isLoading } = useAsync()
  const handleSubmit = (form: IAuthForm) => {
    console.log('e', form)
    run(login(form)).catch((e) => onError(e))
  }

  return (
    <Fragment>
      {/* <span>登陆名{user ? user.name : ''}</span> */}
      <Form onFinish={handleSubmit} labelCol={{ span: 5 }}>
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
        <LongButton type="primary" htmlType="submit" loading={isLoading}>
          login
        </LongButton>
      </Form>
    </Fragment>
  )
}
