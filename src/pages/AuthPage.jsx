import { Link, useLocation } from 'react-router-dom'

function AuthPage() {
  const location = useLocation()
  const isLogin = location.pathname === '/login'

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand-mark" aria-hidden="true">
            <span>◉</span>
          </div>
          <h1>{isLogin ? 'Đăng nhập' : 'Tạo tài khoản'}</h1>
        </div>

        <form className="auth-form">
          <label>
            <span>Email</span>
            <input type="email" placeholder="you@example.com" />
          </label>

          <label>
            <span>Mật khẩu</span>
            <input type="password" placeholder="••••••••" />
          </label>

          {!isLogin ? (
            <label>
              <span>Xác nhận mật khẩu</span>
              <input type="password" placeholder="Nhập lại mật khẩu" />
            </label>
          ) : null}

          <button type="submit" className="btn btn-primary">
            {isLogin ? 'Đăng nhập' : 'Tạo tài khoản'}
          </button>

          {isLogin ? <Link to="/register" className="text-link auth-link">Quên mật khẩu?</Link> : null}
        </form>

        <p className="auth-bottom-text">
          {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}{' '}
          <Link to={isLogin ? '/register' : '/login'} className="text-link">
            {isLogin ? 'Đăng ký' : 'Đăng nhập'}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AuthPage
