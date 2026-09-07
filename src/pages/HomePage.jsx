import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import StoryCard from '../components/StoryCard'
import VipBanner from '../components/VipBanner'
import GenreChip from '../components/GenreChip'
import { genres, stories, stats } from '../lib/mockData'

const featuredStories = stories.slice(0, 7)
const newestStories = stories.slice(7, 15)
const recommendedStories = stories.slice(4, 12)
const genreList = ['Tiên hiệp', 'Kiếm hiệp', 'Huyền huyễn', 'Ngôn tình', 'Đô thị', 'Trinh thám', 'Kinh dị', 'Xuyên không', 'Lịch sử', 'Fantasy', 'Cổ đại', 'Võng du']

function HomePage() {
  return (
    <div className="page-content">
      <section className="hero-section container">
        <div className="hero-copy">
          <span className="eyebrow">NGHE TRUYỆN AUDIO</span>
          <h1>Thế giới truyện trong từng âm thanh</h1>
          <p>
            Khám phá những câu chuyện hấp dẫn và thưởng thức mọi lúc, mọi nơi.
          </p>
          <div className="hero-actions">
            <Link to="/library" className="btn btn-primary large">
              Khám phá ngay
            </Link>
            <Link to="/story/hanh-trinh-van-gioi" className="btn btn-secondary large">
              Nghe ngay
            </Link>
          </div>
          <div className="hero-stats">
            <div>
              <strong>{stats.totalStories}</strong>
              <span>Truyện</span>
            </div>
            <div>
              <strong>{stats.listeners}</strong>
              <span>Người nghe</span>
            </div>
            <div>
              <strong>{stats.vipMembers}</strong>
              <span>VIP</span>
            </div>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="hero-visual">
            <div className="hero-book" />
            <div className="hero-headphones" />
            <div className="hero-wave hero-wave-one" />
            <div className="hero-wave hero-wave-two" />
            <div className="hero-badge">6.8K đang nghe</div>
          </div>
        </div>
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Khám phá</span>
            <h2>Top truyện tuần</h2>
          </div>
          <Link to="/rankings" className="text-link">
            Xem thêm
          </Link>
        </div>
        <div className="story-grid grid-6">
          {featuredStories.map((story, index) => (
            <StoryCard key={story.id} story={story} rank={index + 1} />
          ))}
        </div>
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Mới cập nhật</span>
            <h2>Truyện mới nhất</h2>
          </div>
          <Link to="/library" className="text-link">
            Xem thêm
          </Link>
        </div>
        <div className="story-grid grid-4">
          {newestStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Cho bạn</span>
            <h2>Dành cho bạn</h2>
          </div>
        </div>
        <div className="story-grid grid-4">
          {recommendedStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>

      <VipBanner />

      <section className="container section-block">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Thể loại phổ biến</span>
            <h2>Khám phá theo thể loại</h2>
          </div>
        </div>
        <div className="genre-row">
          {genreList.map((genre, index) => (
            <GenreChip key={genre} label={genre} active={index === 0} />
          ))}
        </div>
      </section>

      <section className="container section-block search-cta">
        <div className="search-cta-inner">
          <div>
            <span className="eyebrow">Công cụ tìm kiếm</span>
            <h3>Tìm truyện phù hợp với tâm trạng của bạn</h3>
          </div>
          <SearchBar placeholder="Tìm truyện bạn muốn nghe..." />
        </div>
      </section>
    </div>
  )
}

export default HomePage
