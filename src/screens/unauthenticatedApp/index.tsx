import styled from '@emotion/styled'

import logo from '../../assets/logo.svg'
import left from '../../assets/left.svg'
import right from '../../assets/right.svg'
import { LoginScreen } from './login'

export const UnauthenticatedApp = () => {
  return (
    <div>
      <Header></Header>
      <LoginScreen></LoginScreen>
    </div>
  )
}

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`
