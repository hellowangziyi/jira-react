import React, { useEffect, useRef } from 'react'
import { useMount } from './use-mount'
export const useDocumentTitle = (title: string, keepOnMount = true) => {
  const old = useRef(document.title).current
  //因为闭包，所以读到旧title值
  //页面加载时：old=旧title
  //加载后：old=新title
  useEffect(() => {
    document.title = title
  }, [title])

  // useMount(() => {
  //   document.title = title
  // })
  useEffect(() => {
    return () => {
      if (!keepOnMount) {
        document.title = old
      }
    }
  }, [keepOnMount, old])
}
