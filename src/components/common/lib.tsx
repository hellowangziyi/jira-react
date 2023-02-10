import React from 'react'
import styled from '@emotion/styled'
import { Button, Spin, Typography } from 'antd'
import { DevTools } from 'jira-dev-tool'

// container
export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 100vh;
`

export const ScreenContainer = styled('div')`
  padding: 3.2rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const Row = styled('div')<{
  between?: boolean
  marginBottom?: number
  gap?: number | boolean
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? 'space-between' : undefined)};
  margin-bottom: ${(props) => props.marginBottom + 'rem'};

  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === 'number'
        ? props.gap + 'rem'
        : props.gap
        ? '2rem'
        : undefined};
  }
`

// button
export const LongButton = styled(Button)`
  width: 100%;
`

export const NoPaddingButton = styled(Button)`
  padding: 0;
`

export const LinkButton = (props: React.ComponentProps<typeof Button>) => {
  return <NoPaddingButton type="link" {...props}></NoPaddingButton>
}

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

// fullpage
export const FullPage = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justity-content: center;
  align-items: center;
`

export const FullLoadingPage = () => {
  return (
    <FullPage>
      <Spin size={'large'} tip="Loading"></Spin>
      <DevTools></DevTools>
    </FullPage>
  )
}
