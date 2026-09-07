import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navItems } from '../lib/mockData'
import SearchBar from './SearchBar'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

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
            <Link to="/login" className="btn btn-ghost">
              Đăng nhập
            </Link>
            <Link to="/register" className="btn btn-primary">
              Đăng ký
            </Link>
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
              <Link to="/login" className="btn btn-ghost" onClick={() => setMenuOpen(false)}>
                Đăng nhập
              </Link>
              <Link to="/register" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}

export default Header
