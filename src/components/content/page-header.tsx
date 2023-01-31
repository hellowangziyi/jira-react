import React from 'react'
import styled from '@emotion/styled'
import { Row } from 'antd'

export const PageHeader = () => {
  return <Header between={true} marginBottom={2} as={'header'}></Header>
}

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`

const HeaderLeft = styled(Row)``

const HeaderRight = styled.div``
