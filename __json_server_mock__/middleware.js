module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/login') {
    const { username, password } = req.body
    if (username === 'admin' && password === 'admin') {
      res.status(200).json({
        token: '123',
      })
    } else {
      res.status(400).json({
        msg: '账号或密码错误!',
      })
    }
  }
  next()
}
