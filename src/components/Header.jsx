import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { navItems } from '../lib/mockData'
import { getDb, getFirebaseAuth, isFirebaseConfigured } from '../lib/firebase'
import SearchBar from './SearchBar'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [isVip, setIsVip] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)

  useEffect(() => {
    const auth = getFirebaseAuth()
    if (!isFirebaseConfigured() || !auth) return undefined

    let isActive = true

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!isActive) return

      setCurrentUser(user)
      setIsVip(false)

      if (!user) return

      const db = getDb()
      if (!db) return

      try {
        const profileSnapshot = await getDoc(doc(db, 'users', user.uid))
        if (isActive) {
          setIsVip(Boolean(profileSnapshot.data()?.vip))
        }
      } catch {
        if (isActive) {
          setIsVip(false)
        }
      }
    })

    return () => {
      isActive = false
      unsubscribe()
    }
  }, [])

  const handleSignOut = async () => {
    const auth = getFirebaseAuth()
    if (!auth) return

    setIsSigningOut(true)

    try {
      await signOut(auth)
      setCurrentUser(null)
      setIsVip(false)
      setMenuOpen(false)
    } finally {
      setIsSigningOut(false)
    }
  }

  const accountName = currentUser?.displayName || currentUser?.email || 'Tài khoản'
  const membershipLabel = isVip ? 'VIP' : 'Thành viên'

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="NgheTruyện">
          <div className="brand-mark" aria-hidden="true">
            <span>◉</span>
          </div>
          <div className="brand-text">
            <span className="brand-main">NgheTruyện</span>
            <span className="brand-sub">Audio stories</span>
          </div>
        </Link>

        <nav className="main-nav" aria-label="Điều hướng chính">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-tools desktop-only">
          <div className="header-search">
            <SearchBar compact />
          </div>
          <div className="auth-actions">
            {currentUser ? (
              <>
                <div className="account-summary" title={accountName}>
                  <strong>{accountName}</strong>
                  <span>{membershipLabel}</span>
                </div>
                <Link to="/dashboard" className="btn btn-primary">
                  Dashboard
                </Link>
                <button type="button" className="btn btn-ghost" onClick={handleSignOut} disabled={isSigningOut}>
                  {isSigningOut ? 'Đang đăng xuất...' : 'Đăng xuất'}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost">
                  Đăng nhập
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="mobile-tools">
          <button type="button" className="icon-button" aria-label="Tìm kiếm">
            ⌕
          </button>
          <button
            type="button"
            className="icon-button menu-button"
            aria-label="Mở menu"
            onClick={() => setMenuOpen((value) => !value)}
          >
            ☰
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="mobile-menu">
          <div className="container mobile-menu-inner">
            <SearchBar compact placeholder="Tìm truyện..." />
            <nav className="mobile-nav" aria-label="Menu mobile">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="mobile-actions">
              {currentUser ? (
                <>
                  <div className="account-summary mobile-account-summary">
                    <strong>{accountName}</strong>
                    <span>{membershipLabel}</span>
                  </div>
                  <Link to="/dashboard" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <button type="button" className="btn btn-ghost" onClick={handleSignOut} disabled={isSigningOut}>
                    {isSigningOut ? 'Đang đăng xuất...' : 'Đăng xuất'}
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-ghost" onClick={() => setMenuOpen(false)}>
                    Đăng nhập
                  </Link>
                  <Link to="/register" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
                    Đăng ký
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}

export default Header
