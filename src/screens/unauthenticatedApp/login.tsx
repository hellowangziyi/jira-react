import { Button, Form, Input } from 'antd'
import React, { FormEvent, Fragment } from 'react'

export const LoginScreen = () => {
  const login = (param: { username: string; password: string }) => {
    fetch(`http://localhost:3001/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(param)
    })
      .then((response) => {
        if (response.ok) {
          console.log('result: ', response.json())
        } else {
          console.log('fail...')
        }
      })
      .catch((e) => {
        console.log('error: ', e)
      })
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const currentTarget = e.currentTarget
    const username = (currentTarget[0] as HTMLInputElement).value
    const password = (currentTarget[1] as HTMLInputElement).value
    login({ username, password })
  }

  return (
    <Fragment>
      <Form onFinish={(e) => handleSubmit(e)}>
        <Form.Item label="用户名" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="密码" name="password">
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          login
        </Button>
        <Button type="primary">lllll</Button>
      </Form>
    </Fragment>
  )
}
