import { useMemo, useState } from 'react'

function AudioPlayer({ story = null }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(72)
  const [speed, setSpeed] = useState(1)
  const [currentTime, setCurrentTime] = useState(78)

  const episode = useMemo(() => {
    if (!story || !story.episodes?.length) {
      return { title: 'Chương 1: Khởi đầu', duration: '12:14' }
    }

    return story.episodes[0]
  }, [story])

  const totalSeconds = 12 * 60 + 14
  const currentRatio = Math.min((currentTime / totalSeconds) * 100, 100)

  return (
    <div className="audio-player-shell">
      <div className="audio-player">
        <div className="player-track-info">
          <div className="mini-cover" style={{ background: story?.cover || 'linear-gradient(135deg, #12355B, #2563EB)' }} />
          <div>
            <p className="player-story">{story?.title || 'Hành Trình Vạn Giới'}</p>
            <p className="player-episode">{episode.title}</p>
          </div>
        </div>

        <div className="player-controls-wrap">
          <div className="player-controls">
            <button type="button" className="control-btn" aria-label="Phát trước">
              ⏮
            </button>
            <button
              type="button"
              className="control-btn primary"
              aria-label={isPlaying ? 'Tạm dừng' : 'Phát'}
              onClick={() => setIsPlaying((value) => !value)}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button type="button" className="control-btn" aria-label="Phát tiếp">
              ⏭
            </button>
          </div>

          <div className="player-progress-block">
            <span className="time">01:18</span>
            <div className="progress-bar" aria-label="Progress bar">
              <div className="progress-fill" style={{ width: `${currentRatio}%` }} />
            </div>
            <span className="time">{episode.duration}</span>
          </div>
        </div>

        <div className="player-tools">
          <div className="volume-wrap">
            <span aria-hidden="true">🔊</span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
            />
          </div>
          <select value={speed} onChange={(event) => setSpeed(Number(event.target.value))} aria-label="Tốc độ phát">
            <option value={0.75}>0.75x</option>
            <option value={1}>1x</option>
            <option value={1.25}>1.25x</option>
            <option value={1.5}>1.5x</option>
          </select>
          <button type="button" className="playlist-btn">
            ≡ Playlist
          </button>
        </div>
      </div>
    </div>
  )
}

export default AudioPlayer
