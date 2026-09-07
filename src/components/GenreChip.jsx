function GenreChip({ label, active = false }) {
  return <button type="button" className={`genre-chip ${active ? 'active' : ''}`}>{label}</button>
}

export default GenreChip
