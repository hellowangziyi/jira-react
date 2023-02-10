import React, { PropsWithChildren, ReactElement } from 'react'
import { FullErrorPage } from './lib'

interface Istate {
  error: Error | null
}
// type FallbackRender = (props: { error: Error | null }) => ReactElement

//有children 和 fallbackRender 两个props
class ErrorBoundary extends React.Component<PropsWithChildren, Istate> {
  state: Istate = { error: null }

  static getDerivedStateFromError(error: Error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { error }
  }

  render() {
    const { error } = this.state
    const { children } = this.props
    if (error) {
      return <FullErrorPage error={error}></FullErrorPage>
    }
    return children
  }
}
