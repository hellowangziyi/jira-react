import React from 'react'
import styled from '@emotion/styled'
import { Button, Typography } from 'antd'

// container
export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 100vh;
`

// button
export const LongButton = styled(Button)`
  width: 100%;
`

//error
interface ErrorTypographProps
  extends React.ComponentProps<typeof Typography.Text> {
  error: Error | unknown
}

export const isError = (error: any): error is Error =>
  error && error.message !== null && error.message !== undefined

export const ErrorTypography = ({
  error,
  ...restProps
}: ErrorTypographProps) => {
  return isError(error) ? (
    <Typography.Text type={'danger'} {...restProps}>
      {error.message}
    </Typography.Text>
  ) : null
}
