import { Button } from 'antd'
import { useAuth } from '../../context/auth-context'

export default function AuthenticateApp() {
  const { logout, user } = useAuth()
  return (
    <div>
      <div>我已经登陆了！</div>
      <Button onClick={() => logout()} type={'primary'}>
        退出登陆
      </Button>
    </div>
  )
}
