import { Form, Input } from 'antd'
import React, { FormEvent, Fragment } from 'react'

import { LongButton } from '../../components/common/lib'
import { useAuth } from '../../context/auth-context'
import { IAuthForm } from '../../types/form'

export const RegisterScreen = () => {
  const { register } = useAuth()
  const handleSubmit = (form: IAuthForm) => {
    console.log('e', form)
    register(form)
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
        <Form.Item label="确认密码" name="cpassword">
          <Input
            placeholder="Please confirm password"
            type="password"
            id="cpassword"
          />
        </Form.Item>
        <LongButton type="primary" htmlType="submit">
          register
        </LongButton>
      </Form>
    </Fragment>
  )
}
