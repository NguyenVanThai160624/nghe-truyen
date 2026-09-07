import Header from '../components/Header'
import Footer from '../components/Footer'
import AudioPlayer from '../components/AudioPlayer'

function MainLayout({ children, activeStory }) {
  return (
    <div className="app-shell">
      <Header />
      <main className="page-shell">{children}</main>
      <Footer />
      <AudioPlayer story={activeStory} />
    </div>
  )
}

export default MainLayout
