import StoryCard from '../components/StoryCard'
import { stories, rankingTabs } from '../lib/mockData'

const rankingStories = stories.slice(0, 8)

function RankingsPage() {
  return (
    <div className="container section-block page-section">
      <div className="page-header">
        <div>
          <span className="eyebrow">Bảng xếp hạng</span>
          <h1>Xếp hạng truyện</h1>
        </div>
      </div>

      <div className="tabs-row">
        {rankingTabs.map((tab, index) => (
          <button type="button" key={tab} className={`tab-btn ${index === 0 ? 'active' : ''}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="ranking-top3">
        {rankingStories.slice(0, 3).map((story, index) => (
          <div key={story.id} className={`top-rank-card rank-${index + 1}`}>
            <div className="top-card-cover" style={{ background: story.cover }}>
              <span className="story-rank">#{index + 1}</span>
            </div>
            <div className="top-card-body">
              <span className="top-category">{story.category}</span>
              <h3>{story.title}</h3>
              <div className="top-meta">
                <span>{story.views} nghe</span>
                <button type="button" className="play-mini mini-top">▶</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="ranking-list">
        {rankingStories.slice(3).map((story, index) => (
          <div className="ranking-item" key={story.id}>
            <span className="ranking-position">#{index + 4}</span>
            <div className="ranking-cover" style={{ background: story.cover }} />
            <div className="ranking-info">
              <h4>{story.title}</h4>
              <p>{story.category}</p>
            </div>
            <span className="ranking-views">{story.views}</span>
            <button type="button" className="play-mini ranking-play">
              ▶
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RankingsPage
