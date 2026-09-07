import { useParams } from 'react-router-dom'
import { stories } from '../lib/mockData'

function StoryDetailPage() {
  const { id } = useParams()
  const story = stories.find((item) => item.id === id) || stories[0]

  return (
    <div className="container section-block story-detail-page">
      <div className="story-detail-header">
        <div className="story-detail-cover" style={{ background: story.cover }} />

        <div className="story-detail-info">
          <div className="story-detail-badges">
            <span className="story-category dark">{story.category}</span>
            {story.isVip ? <span className="vip-pill">VIP</span> : null}
            <span className="story-status">{story.status}</span>
          </div>

          <h1>{story.title}</h1>

          <div className="story-detail-meta">
            <span>Tác giả: {story.author}</span>
            <span>⭐ {story.rating}</span>
            <span>👁 {story.views}</span>
          </div>

          <p className="story-description">{story.description}</p>

          <div className="story-detail-actions">
            <button type="button" className="btn btn-primary large">
              Nghe ngay
            </button>
            <button type="button" className="btn btn-secondary large">
              Theo dõi
            </button>
          </div>
        </div>
      </div>

      <section className="episode-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Danh sách</span>
            <h2>Danh sách chương</h2>
          </div>
        </div>

        <div className="episode-list">
          {story.episodes.map((episode, index) => (
            <div className="episode-item" key={`${story.id}-${episode.id}`}>
              <div className="episode-badges">
                <span className="episode-number">Chương {index + 1}</span>
                {episode.isVip ? <span className="vip-pill">VIP</span> : null}
              </div>
              <div className="episode-title-row">
                <strong>{episode.title}</strong>
                <span>{episode.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default StoryDetailPage
