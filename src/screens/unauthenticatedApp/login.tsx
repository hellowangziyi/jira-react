import { Button, Form, Input } from 'antd'
import React, { FormEvent, Fragment } from 'react'

import { LongButton } from '../../components/common/lib'
import { useAuth } from '../../context/auth-context'
import { IAuthForm } from '../../types/form'

export const LoginScreen = () => {
  // const login = (param: { username: string; password: string }) => {
  //   fetch(`http://localhost:3001/login`, {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json'
  //     },
  //     body: JSON.stringify(param)
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         console.log('result: ', response.json())
  //       } else {
  //         console.log('fail...')
  //       }
  //     })
  //     .catch((e) => {
  //       console.log('error: ', e)
  //     })
  // }
  const { login } = useAuth()
  const handleSubmit = (form: IAuthForm) => {
    console.log('e', form)
    login(form)
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
        <LongButton type="primary" htmlType="submit">
          login
        </LongButton>
      </Form>
    </Fragment>
  )
}
