import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import HomePage from '../pages/HomePage'
import LibraryPage from '../pages/LibraryPage'
import GenresPage from '../pages/GenresPage'
import RankingsPage from '../pages/RankingsPage'
import SubscriptionPage from '../pages/SubscriptionPage'
import AuthPage from '../pages/AuthPage'
import DashboardPage from '../pages/DashboardPage'
import StoryDetailPage from '../pages/StoryDetailPage'
import { stories } from '../lib/mockData'

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout activeStory={stories[0]}>
            <HomePage />
          </MainLayout>
        }
      />
      <Route
        path="/library"
        element={
          <MainLayout activeStory={stories[1]}>
            <LibraryPage />
          </MainLayout>
        }
      />
      <Route
        path="/genres"
        element={
          <MainLayout activeStory={stories[2]}>
            <GenresPage />
          </MainLayout>
        }
      />
      <Route
        path="/rankings"
        element={
          <MainLayout activeStory={stories[3]}>
            <RankingsPage />
          </MainLayout>
        }
      />
      <Route
        path="/subscription"
        element={
          <MainLayout activeStory={stories[4]}>
            <SubscriptionPage />
          </MainLayout>
        }
      />
      <Route
        path="/login"
        element={
          <MainLayout activeStory={stories[5]}>
            <AuthPage />
          </MainLayout>
        }
      />
      <Route
        path="/register"
        element={
          <MainLayout activeStory={stories[6]}>
            <AuthPage />
          </MainLayout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <MainLayout activeStory={stories[0]}>
            <DashboardPage />
          </MainLayout>
        }
      />
      <Route
        path="/story/:id"
        element={
          <MainLayout activeStory={stories[0]}>
            <StoryDetailPage />
          </MainLayout>
        }
      />
    </Routes>
  )
}

export default AppRoutes
