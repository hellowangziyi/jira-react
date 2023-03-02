import { configureStore } from '@reduxjs/toolkit'
import { projectSlice } from './features/projectSlice'

// configureStore创建一个redux数据
const store = configureStore({
  //合并多个slice
  reducer: {
    projectList: projectSlice.reducer
  }
})

export default store
