import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <div className="brand footer-brand">
            <div className="brand-mark" aria-hidden="true">
              <span>◉</span>
            </div>
            <div className="brand-text">
              <span className="brand-main">NgheTruyện</span>
            </div>
          </div>
          <p className="footer-description">
            Khám phá thế giới truyện audio với giọng đọc sống động và kho tàng đa dạng.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Khám phá</h4>
            <Link to="/library">Thư viện</Link>
            <Link to="/genres">Thể loại</Link>
            <Link to="/rankings">Xếp hạng</Link>
          </div>
          <div>
            <h4>Hỗ trợ</h4>
            <Link to="/subscription">VIP</Link>
            <Link to="/login">Đăng nhập</Link>
            <Link to="/register">Đăng ký</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">© 2026 NgheTruyện. Mọi quyền được bảo lưu.</div>
    </footer>
  )
}

export default Footer
