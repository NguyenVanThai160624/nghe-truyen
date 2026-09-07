import { Link } from 'react-router-dom'

function StoryCard({ story, rank, compact = false, showPlay = true }) {
  return (
    <article className={`story-card ${compact ? 'compact' : ''}`}>
      <Link to={`/story/${story.id}`} className="story-cover-wrap" aria-label={story.title}>
        <div className="story-cover" style={{ background: story.cover }}>
          {rank ? <span className="story-rank">#{rank}</span> : null}
          {story.isVip ? <span className="vip-pill-lite">VIP</span> : null}
          {showPlay ? <button type="button" className="play-mini" aria-label={`Nghe ${story.title}`}>
            ▶
          </button> : null}
        </div>
      </Link>

      <div className="story-content">
        <div className="story-meta-row">
          <span className="story-category">{story.category}</span>
          {story.isVip ? <span className="vip-pill">VIP</span> : null}
        </div>

        <Link to={`/story/${story.id}`} className="story-title-link">
          <h3>{story.title}</h3>
        </Link>

        <p className="story-author">{story.author}</p>

        <div className="story-stats">
          <span>{story.episodes?.length || 0} chương</span>
          <span>{story.views} nghe</span>
        </div>
      </div>
    </article>
  )
}

export default StoryCard
