import { Drawer } from 'antd'
import React from 'react'
import { useProjectModel } from '../../shared/hooks/use-projects'

export const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModel()
  return (
    <Drawer
      placement="right"
      open={projectModalOpen}
      onClose={close}
      width={'100%'}
    >
      <h1>创建项目</h1>
    </Drawer>
  )
}
