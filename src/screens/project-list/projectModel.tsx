import styled from '@emotion/styled'
import { Button, Drawer, Form, Input, Spin } from 'antd'
import React, { useEffect } from 'react'
import { ErrorTypography, ScreenContainer } from '../../components/common/lib'
import {
  useAddProject,
  useEditProject,
  useProjectModel
} from '../../shared/hooks/use-projects'

export const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } =
    useProjectModel()

  const title = editingProject ? '编辑项目' : '新建项目'
  const [form] = Form.useForm()

  const mutateProject = editingProject ? useEditProject : useAddProject
  const { mutateAsync, isLoading: submitLoading, error } = mutateProject()

  const onFinish = (val: any) => {
    console.log(val)
    mutateAsync({ ...editingProject, ...val }).then(() => {
      form.resetFields()
      close()
    })
  }
  useEffect(() => {
    console.log('editingProject', editingProject)
    form.setFieldsValue(editingProject)
    if (editingProject === undefined) form.resetFields()
  }, [editingProject, form])
  return (
    <Drawer
      forceRender={true}
      placement="right"
      open={projectModalOpen}
      onClose={close}
      width={'100%'}
    >
      <ErrorTypography error={error}></ErrorTypography>
      {isLoading ? (
        <ScreenContainer>
          <Spin size="large"></Spin>
        </ScreenContainer>
      ) : (
        <ScreenContainer>
          <h1>{title}</h1>
          <Form
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 13 }}
            onFinish={onFinish}
          >
            <Form.Item
              label="项目名称"
              name="name"
              rules={[
                { required: true, message: 'Please input your username!' }
              ]}
            >
              <Input></Input>
            </Form.Item>
            <Form.Item
              label="部门"
              name="organization"
              rules={[
                { required: true, message: 'Please input your username!' }
              ]}
            >
              <Input></Input>
            </Form.Item>
            <Form.Item
              label="负责人"
              name="personId"
              rules={[
                { required: true, message: 'Please input your username!' }
              ]}
            >
              <Input></Input>
            </Form.Item>
            <Form.Item style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit" loading={submitLoading}>
                提交
              </Button>
            </Form.Item>
          </Form>
        </ScreenContainer>
      )}
    </Drawer>
  )
}
