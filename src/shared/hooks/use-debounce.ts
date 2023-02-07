import * as React from 'react'
import { useState, useEffect } from 'react'

export const useDebounce = <T>(value: T, delay?: number) => {
  const [debounceVal, setDebounceVal] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceVal(value)
    }, delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounceVal
}
