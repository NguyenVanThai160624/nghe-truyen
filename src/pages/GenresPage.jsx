import { Link } from 'react-router-dom'
import { genres, stories } from '../lib/mockData'

const genreCards = genres.map((genre) => ({
  ...genre,
  storiesInGenre: stories.filter((story) => story.category === genre.name).slice(0, 4),
}))

function GenresPage() {
  return (
    <div className="container section-block page-section">
      <div className="page-header">
        <div>
          <span className="eyebrow">Khám phá</span>
          <h1>Thể loại</h1>
        </div>
      </div>

      <div className="genre-listing">
        {genreCards.map((genre) => (
          <div className="genre-panel" key={genre.name}>
            <div className="genre-header-row">
              <div className="genre-icon" aria-hidden="true">🎧</div>
              <div>
                <h3>{genre.name}</h3>
                <p>{genre.stories} truyện</p>
              </div>
            </div>

            <div className="mini-story-list">
              {genre.storiesInGenre.map((story) => (
                <Link key={story.id} to={`/story/${story.id}`} className="mini-story-item">
                  <span className="mini-card" style={{ background: story.cover }} />
                  <div>
                    <strong>{story.title}</strong>
                    <span>{story.author}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GenresPage
