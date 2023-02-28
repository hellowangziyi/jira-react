import React from 'react'
import styled from '@emotion/styled'
import { Row } from '../common/lib'

import softwareLogo from '../../assets/software-logo.svg'
import { Button, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { useAuth } from '../../context/auth-context'
import { ProjectPopover } from '../../screens/project-list/projectPopover'

export const PageHeader = (props: {
  setProjectModalOpen: (isOpen: boolean) => void
}) => {
  const { logout, user } = useAuth()
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <a onClick={logout}>logout</a>
    }
  ]
  return (
    <Header between={true} marginBottom={2} as={'header'}>
      <HeaderLeft gap={true}>
        {/* <SoftwareLogo></SoftwareLogo> */}
        <Logo src={softwareLogo}></Logo>
        <ProjectPopover
          setProjectModalOpen={props.setProjectModalOpen}
        ></ProjectPopover>

        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown menu={{ items }}>
          <Button type="link" onClick={(e) => e.preventDefault()}>
            Hi,{user?.name}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  )
}

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`

const HeaderLeft = styled(Row)``

const HeaderRight = styled.div``

const SoftwareLogo = styled.div`
  backgroud: url(${softwareLogo}) no-repeat center;
  background-size: 2rem;
  width: 100px;
`
const Logo = styled.img`
  width: 18rem;
  color: rgb(38, 132, 255);
`
