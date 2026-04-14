import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SiteLayout from './layouts/SiteLayout'

// Lazy load page components for optimized performance
const Home = lazy(() => import('./pages/Home'))
const CosmosProject = lazy(() => import('./pages/CosmosProject'))
const SelectedProjects = lazy(() => import('./pages/SelectedProjects'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const CosmicLab = lazy(() => import('./pages/CosmicLab'))

function App() {
  return (
    <Router>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<SiteLayout />}>
            <Route index element={<Home />} />
            <Route path="cosmos-project" element={<CosmosProject />} />
            <Route path="selected-projects" element={<SelectedProjects />} />
            <Route path="cosmic-lab" element={<CosmicLab />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
