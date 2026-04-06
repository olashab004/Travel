import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { PageLoader } from './components/LoadingSkeleton';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const StateList = lazy(() => import('./pages/StateList'));
const PlaceDetail = lazy(() => import('./pages/PlaceDetail'));
const Admin = lazy(() => import('./pages/Admin'));

export default function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/states" element={<StateList />} />
            <Route path="/states/:stateId" element={<StateList />} />
            <Route path="/places/:placeId" element={<PlaceDetail />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}
