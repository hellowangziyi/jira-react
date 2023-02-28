import { Drawer } from 'antd'
import React from 'react'

export const ProjectModal = (props: {
  projectModalOpen: boolean
  onClose: () => void
}) => {
  return (
    <Drawer
      placement="right"
      open={props.projectModalOpen}
      onClose={props.onClose}
      width={'100%'}
    ></Drawer>
  )
}
