import { Drawer } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  projectSliceActions,
  selectProjectModleOpen
} from '../../store/features/projectSlice'

export const ProjectModal = () => {
  const dispatch = useDispatch()
  const projectModleOpen = useSelector(selectProjectModleOpen)
  console.log('projectModleOpen', projectModleOpen)
  return (
    <Drawer
      placement="right"
      open={projectModleOpen}
      onClose={() => dispatch(projectSliceActions.closeProjectModel())}
      width={'100%'}
    ></Drawer>
  )
}
