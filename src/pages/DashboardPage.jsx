import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { getDb, getFirebaseAuth, isFirebaseConfigured } from '../lib/firebase'

function DashboardPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isVip, setIsVip] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const auth = getFirebaseAuth()

    if (!isFirebaseConfigured() || !auth) {
      navigate('/login', { replace: true })
      setIsLoading(false)
      return undefined
    }

    let isActive = true

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!isActive) return

      if (!currentUser) {
        navigate('/login', { replace: true })
        setIsLoading(false)
        return
      }

      setUser(currentUser)

      try {
        const db = getDb()
        const profileSnapshot = db
          ? await getDoc(doc(db, 'users', currentUser.uid))
          : null

        if (isActive) {
          setIsVip(Boolean(profileSnapshot?.data()?.vip))
        }
      } catch {
        if (isActive) {
          setErrorMessage('Không thể tải thông tin hồ sơ. Trạng thái tài khoản tạm thời hiển thị là thành viên thường.')
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    })

    return () => {
      isActive = false
      unsubscribe()
    }
  }, [navigate])

  const handleSignOut = async () => {
    const auth = getFirebaseAuth()
    if (!auth) return

    setIsSigningOut(true)
    setErrorMessage('')

    try {
      await signOut(auth)
      navigate('/')
    } catch {
      setErrorMessage('Đăng xuất không thành công. Vui lòng thử lại.')
      setIsSigningOut(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container section-block page-section">
        <div className="page-header centered">
          <span className="eyebrow">Tài khoản</span>
          <h1>Đang kiểm tra tài khoản...</h1>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="container section-block page-section">
      <div className="page-header">
        <div>
          <span className="eyebrow">Tài khoản</span>
          <h1>Dashboard</h1>
          <p className="section-description">Quản lý thông tin tài khoản NgheTruyện của bạn.</p>
        </div>
      </div>

      <div className="toolbar-panel">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Thông tin tài khoản</span>
            <h2>{user.email}</h2>
          </div>
          <span className="status-pill">{isVip ? 'VIP' : 'Thành viên thường'}</span>
        </div>

        {errorMessage ? (
          <p role="alert" className="section-description">{errorMessage}</p>
        ) : null}

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSignOut}
          disabled={isSigningOut}
        >
          {isSigningOut ? 'Đang đăng xuất...' : 'Đăng xuất'}
        </button>
      </div>
    </div>
  )
}

export default DashboardPage
