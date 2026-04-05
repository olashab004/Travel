import React from 'react';
import Navbar from './Navbar';
import ErrorBoundary from './ErrorBoundary';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white flex flex-col font-sans antialiased">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-gray-50 border-t border-gray-100 py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                    <span className="font-bold text-lg">TB</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">TravelBharat</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Discover the soul of India through its diverse states, ancient heritage, and breathtaking landscapes. Your digital encyclopedia for Indian tourism.
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="/" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">Home</a></li>
                  <li><a href="/states" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">Explore States</a></li>
                  <li><a href="/admin" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">Admin Panel</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Categories</h3>
                <ul className="space-y-2">
                  <li><span className="text-gray-500 text-sm">Heritage & History</span></li>
                  <li><span className="text-gray-500 text-sm">Nature & Wildlife</span></li>
                  <li><span className="text-gray-500 text-sm">Religious & Spiritual</span></li>
                  <li><span className="text-gray-500 text-sm">Adventure & Sports</span></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-xs">
                © {new Date().getFullYear()} TravelBharat. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <span className="text-gray-400 text-xs hover:text-gray-600 cursor-pointer">Privacy Policy</span>
                <span className="text-gray-400 text-xs hover:text-gray-600 cursor-pointer">Terms of Service</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}
