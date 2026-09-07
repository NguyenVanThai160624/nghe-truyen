import { useState } from 'react'

function SearchBar({ compact = false, placeholder = 'Tìm truyện, tác giả, thể loại...' }) {
  const [query, setQuery] = useState('')

  return (
    <div className={`search-bar ${compact ? 'compact' : ''}`}>
      <span className="search-icon" aria-hidden="true">
        ⌕
      </span>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        aria-label="Tìm kiếm truyện"
      />
    </div>
  )
}

export default SearchBar
