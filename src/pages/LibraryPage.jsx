import { useMemo, useState } from 'react'
import StoryCard from '../components/StoryCard'
import { stories, genres } from '../lib/mockData'

const storiesForLibrary = stories.slice(0, 18)

function LibraryPage() {
  const [selectedGenre, setSelectedGenre] = useState('Tất cả')
  const [selectedStatus, setSelectedStatus] = useState('Tất cả')
  const [selectedVip, setSelectedVip] = useState('Tất cả')
  const [sortBy, setSortBy] = useState('Mới cập nhật')

  const filteredStories = useMemo(() => {
    let list = storiesForLibrary

    if (selectedGenre !== 'Tất cả') {
      list = list.filter((story) => story.category === selectedGenre)
    }

    if (selectedStatus !== 'Tất cả') {
      list = list.filter((story) => story.status === selectedStatus)
    }

    if (selectedVip !== 'Tất cả') {
      list = list.filter((story) => (selectedVip === 'VIP' ? story.isVip : !story.isVip))
    }

    if (sortBy === 'Lượt nghe') {
      list = [...list].sort((a, b) => Number.parseFloat(b.views) - Number.parseFloat(a.views))
    }

    return list
  }, [selectedGenre, selectedStatus, selectedVip, sortBy])

  return (
    <div className="container section-block page-section">
      <div className="page-header">
        <div>
          <span className="eyebrow">Thư viện</span>
          <h1>Thư viện truyện</h1>
        </div>
      </div>

      <div className="toolbar-panel">
        <div className="toolbar-search">
          <input type="text" placeholder="Tìm theo tên truyện, tác giả..." />
        </div>

        <div className="filter-row">
          <select value={selectedGenre} onChange={(event) => setSelectedGenre(event.target.value)}>
            <option value="Tất cả">Thể loại</option>
            {genres.map((genre) => (
              <option key={genre.name} value={genre.name}>{genre.name}</option>
            ))}
          </select>

          <select value={selectedStatus} onChange={(event) => setSelectedStatus(event.target.value)}>
            <option value="Tất cả">Trạng thái</option>
            <option value="Đang ra">Đang ra</option>
            <option value="Hoàn thành">Hoàn thành</option>
          </select>

          <select value={selectedVip} onChange={(event) => setSelectedVip(event.target.value)}>
            <option value="Tất cả">VIP</option>
            <option value="VIP">VIP</option>
            <option value="Miễn phí">Miễn phí</option>
          </select>

          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="Mới cập nhật">Sắp xếp</option>
            <option value="Lượt nghe">Lượt nghe</option>
            <option value="Tên A-Z">Tên A-Z</option>
          </select>
        </div>
      </div>

      <div className="story-grid grid-4">
        {filteredStories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>

      <div className="pagination">
        <button type="button" className="page-btn active">1</button>
        <button type="button" className="page-btn">2</button>
        <button type="button" className="page-btn">3</button>
        <button type="button" className="page-btn">Load more</button>
      </div>
    </div>
  )
}

export default LibraryPage
