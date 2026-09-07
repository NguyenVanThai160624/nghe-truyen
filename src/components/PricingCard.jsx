function PricingCard({ plan, price, description, features, featured = false }) {
  return (
    <div className={`pricing-card ${featured ? 'featured' : ''}`}>
      <div className="pricing-header">
        <span className={`plan-badge ${featured ? 'highlight' : ''}`}>{plan}</span>
        <h3>{plan}</h3>
        <p>{description}</p>
      </div>
      <div className="price-row">
        <span className="price">{price}</span>
        <span className="price-unit">/ tháng</span>
      </div>
      <ul className="feature-list">
        {features.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button type="button" className={`btn ${featured ? 'btn-primary' : 'btn-secondary'}`}>
        Đăng ký VIP
      </button>
    </div>
  )
}

export default PricingCard
