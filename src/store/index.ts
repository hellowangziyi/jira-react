import { configureStore } from '@reduxjs/toolkit'
import { projectSlice } from './features/projectSlice'

// configureStore创建一个redux数据
export const store = configureStore({
  //合并多个slice
  reducer: {
    projectList: projectSlice.reducer
  }
})

// export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>