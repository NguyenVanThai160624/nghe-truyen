import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { getDb, getFirebaseAuth, isFirebaseConfigured } from '../lib/firebase'

function getFriendlyAuthError(error) {
  const code = error?.code

  switch (code) {
    case 'auth/invalid-email':
      return 'Email không hợp lệ.'
    case 'auth/user-disabled':
      return 'Tài khoản này đã bị vô hiệu hóa.'
    case 'auth/user-not-found':
      return 'Không tìm thấy tài khoản với email này.'
    case 'auth/wrong-password':
      return 'Mật khẩu không chính xác.'
    case 'auth/email-already-in-use':
      return 'Email này đã được sử dụng. Hãy thử email khác.'
    case 'auth/weak-password':
      return 'Mật khẩu quá yếu. Hãy dùng tối thiểu 6 ký tự.'
    case 'auth/too-many-requests':
      return 'Quá nhiều lần thử. Vui lòng thử lại sau.'
    case 'auth/network-request-failed':
      return 'Lỗi kết nối mạng. Vui lòng kiểm tra lại.'
    default:
      if (error?.message) {
        return error.message
      }

      return 'Đã xảy ra lỗi. Vui lòng thử lại.'
  }
}

function getFriendlyProfileError(error) {
  if (error?.code === 'permission-denied') {
    return 'Tài khoản đã được tạo nhưng chưa thể lưu hồ sơ. Vui lòng kiểm tra quyền Firestore.'
  }

  return 'Tài khoản đã được tạo nhưng chưa thể lưu hồ sơ người dùng. Vui lòng thử lại sau.'
}

function AuthPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const isLogin = location.pathname === '/login'

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))

    if (errorMessage) {
      setErrorMessage('')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const email = formData.email.trim()
    const password = formData.password
    const confirmPassword = formData.confirmPassword

    if (!email || !password) {
      setErrorMessage('Vui lòng nhập email và mật khẩu.')
      return
    }

    if (!isLogin && password !== confirmPassword) {
      setErrorMessage('Mật khẩu xác nhận không khớp.')
      return
    }

    const auth = getFirebaseAuth()

    if (!isFirebaseConfigured() || !auth) {
      setErrorMessage('Chế độ demo: Firebase chưa được cấu hình, nên tính năng đăng nhập/đăng ký sẽ không hoạt động trong môi trường này.')
      return
    }

    setIsSubmitting(true)
    setErrorMessage('')

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password)
      } else {
        const credential = await createUserWithEmailAndPassword(auth, email, password)
        const user = credential.user
        const db = getDb()

        if (!db) {
          throw new Error('Firestore chưa được cấu hình.')
        }

        try {
          await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            displayName: '',
            role: 'user',
            vip: false,
            createdAt: serverTimestamp(),
          })
        } catch (error) {
          setErrorMessage(getFriendlyProfileError(error))
          return
        }
      }

      navigate('/')
    } catch (error) {
      setErrorMessage(getFriendlyAuthError(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand-mark" aria-hidden="true">
            <span>◉</span>
          </div>
          <h1>{isLogin ? 'Đăng nhập' : 'Tạo tài khoản'}</h1>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </label>

          <label>
            <span>Mật khẩu</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </label>

          {!isLogin ? (
            <label>
              <span>Xác nhận mật khẩu</span>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Nhập lại mật khẩu"
              />
            </label>
          ) : null}

          {errorMessage ? (
            <p
              role="alert"
              style={{
                margin: 0,
                color: '#b91c1c',
                fontSize: '0.92rem',
                lineHeight: 1.5,
              }}
            >
              {errorMessage}
            </p>
          ) : null}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
            style={isSubmitting ? { opacity: 0.7, cursor: 'wait' } : undefined}
          >
            {isSubmitting
              ? isLogin
                ? 'Đang đăng nhập...'
                : 'Đang tạo tài khoản...'
              : isLogin
                ? 'Đăng nhập'
                : 'Tạo tài khoản'}
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
