import { Link } from 'react-router-dom'

function VipBanner() {
  return (
    <section className="vip-banner">
      <div className="container vip-banner-inner">
        <div>
          <span className="eyebrow">Nghe không giới hạn</span>
          <h2>Trải nghiệm nghe truyện không giới hạn</h2>
          <p>
            Mở khóa kho truyện đặc sắc và tận hưởng trải nghiệm nghe tốt hơn.
          </p>
        </div>
        <Link to="/subscription" className="btn btn-primary large">
          Xem gói VIP
        </Link>
      </div>
    </section>
  )
}

export default VipBanner
