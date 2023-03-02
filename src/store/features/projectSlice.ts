import { createSlice } from '@reduxjs/toolkit'

interface State {
  projectModalOpen: boolean
}

const initialState: State = {
  projectModalOpen: false
}

export const projectSlice = createSlice({
  name: 'projectSlice',
  initialState,
  reducers: {
    openProjectModel: (state) => {
      state.projectModalOpen = true
    },
    closeProjectModel: (state) => {
      state.projectModalOpen = false
    }
  }
})

export const projectSliceActions = projectSlice.actions
