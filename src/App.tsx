import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import StateList from './pages/StateList';
import PlaceDetail from './pages/PlaceDetail';
import Admin from './pages/Admin';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/states" element={<StateList />} />
          <Route path="/states/:stateId" element={<StateList />} />
          <Route path="/places/:placeId" element={<PlaceDetail />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </Router>
  );
}
