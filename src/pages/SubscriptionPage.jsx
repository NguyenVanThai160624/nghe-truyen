import PricingCard from '../components/PricingCard'

const plans = [
  {
    plan: 'FREE',
    price: 'Miễn phí',
    description: 'Khám phá nhanh các truyện nổi bật.',
    features: ['Truy cập cơ bản', 'Giới hạn 3 truyện/tuần', 'Không ưu tiên ưu đãi'],
  },
  {
    plan: 'VIP 1',
    price: '49.000đ',
    description: 'Tận hưởng hàng trăm truyện premium.',
    features: ['Truy cập không giới hạn', 'Nội dung VIP', 'Tối ưu chất lượng nghe', 'Không quảng cáo'],
    featured: false,
  },
  {
    plan: 'VIP 2',
    price: '99.000đ',
    description: 'Mở khóa trải nghiệm cao cấp hơn.',
    features: ['Tất cả quyền lợi VIP 1', 'Đọc ngay nội dung mới', 'Ưu tiên hỗ trợ', 'Giảm giá ưu đãi'],
    featured: true,
  },
]

function SubscriptionPage() {
  return (
    <div className="container section-block page-section subscription-page">
      <div className="page-header centered">
        <div>
          <span className="eyebrow">Gói thành viên</span>
          <h1>Chọn gói phù hợp</h1>
        </div>
      </div>

      <div className="pricing-grid">
        {plans.map((plan) => (
          <PricingCard
            key={plan.plan}
            plan={plan.plan}
            price={plan.price}
            description={plan.description}
            features={plan.features}
            featured={plan.featured}
          />
        ))}
      </div>
    </div>
  )
}

export default SubscriptionPage
