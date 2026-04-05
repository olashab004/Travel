import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { MapPin, ArrowLeft, Search, Filter, Landmark, TreePine, Heart, Mountain, Compass, ChevronRight, Star } from 'lucide-react';
import { firestoreService } from '../services/firestoreService';
import { State, TouristPlace, City } from '../types';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const CATEGORIES = ['Heritage', 'Nature', 'Religious', 'Adventure', 'Beach', 'Wildlife'];

export default function StateList() {
  const { stateId } = useParams<{ stateId: string }>();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || null;
  
  const [states, setStates] = useState<State[]>([]);
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [places, setPlaces] = useState<TouristPlace[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string | null>(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const statesData = await firestoreService.getStates();
        setStates(statesData || []);
        
        if (stateId) {
          const state = statesData?.find(s => s.id === stateId);
          setSelectedState(state || null);
          const [placesData, citiesData] = await Promise.all([
            firestoreService.getPlaces(stateId),
            firestoreService.getCities(stateId)
          ]);
          setPlaces(placesData || []);
          setCities(citiesData || []);
        } else {
          // Global search or all states
          const allPlaces = await firestoreService.getPlaces();
          setPlaces(allPlaces || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [stateId]);

  const filteredPlaces = places.filter(place => {
    const matchesCategory = !filterCategory || place.category === filterCategory;
    const searchLower = searchQuery.toLowerCase();
    
    // Find state and city names for better filtering
    const stateName = states.find(s => s.id === place.stateId)?.name.toLowerCase() || '';
    const cityName = cities.find(c => c.id === place.cityId)?.name.toLowerCase() || place.cityId.toLowerCase();
    
    const matchesSearch = 
      place.name.toLowerCase().includes(searchLower) ||
      place.description.toLowerCase().includes(searchLower) ||
      stateName.includes(searchLower) ||
      cityName.includes(searchLower) ||
      place.category.toLowerCase().includes(searchLower);
      
    return matchesCategory && matchesSearch;
  });

  const filteredStates = states.filter(state => 
    state.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    state.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If no stateId and no search query, show states
  if (!stateId && !searchQuery) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-black text-gray-900 tracking-tight">Explore States of India</h1>
          <p className="text-xl text-gray-500 leading-relaxed">Select a state to discover its unique culture, history, and breathtaking destinations.</p>
          <div className="relative max-w-xl mx-auto pt-4">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
            <input 
              type="text" 
              placeholder="Search for a state or destination..." 
              className="w-full pl-14 pr-6 py-5 bg-white border-2 border-gray-100 rounded-[2rem] shadow-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-lg font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {states.map((state, idx) => (
            <motion.div
              key={state.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link to={`/states/${state.id}`} className="group block bg-white rounded-[3rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-gray-50 h-full flex flex-col">
                <div className="h-72 relative overflow-hidden">
                  <img 
                    src={state.imageUrl || `https://picsum.photos/seed/${state.name}/800/600`} 
                    alt={state.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-xs font-black text-indigo-600 uppercase tracking-[0.2em] shadow-sm">
                      {state.code}
                    </span>
                  </div>
                </div>
                <div className="p-10 space-y-4 flex-grow flex flex-col">
                  <h3 className="text-3xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors tracking-tight">{state.name}</h3>
                  <p className="text-gray-500 text-base line-clamp-3 leading-relaxed flex-grow">{state.description || "Discover the incredible heritage and natural beauty of this state."}</p>
                  <div className="pt-6 flex items-center text-indigo-600 font-black text-lg group-hover:translate-x-2 transition-transform">
                    Explore Now <ChevronRight size={24} className="ml-2" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-24">
      {/* Hero Section */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={selectedState?.imageUrl || `https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=2000&q=80`} 
            alt={selectedState?.name || "Global Search"} 
            className="w-full h-full object-cover brightness-[0.45]"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8">
          <Link to="/states" className="inline-flex items-center text-indigo-300 hover:text-white transition-colors font-black uppercase tracking-widest text-sm">
            <ArrowLeft size={20} className="mr-2" /> Back to All States
          </Link>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
            {selectedState?.name || (searchQuery ? "Search Results" : "All Destinations")}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed">
            {selectedState?.description || `Showing results for "${searchQuery}" across all of Bharat.`}
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[3rem] shadow-2xl -mt-24 relative z-20 p-10 border border-gray-50">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="flex-grow max-w-xl relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
              <input 
                type="text" 
                placeholder="Search by name, state, city, or category..." 
                className="w-full pl-16 pr-6 py-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:bg-white transition-all text-lg font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mr-2">Filter by:</span>
              <button 
                onClick={() => setFilterCategory(null)}
                className={cn(
                  "px-8 py-4 rounded-2xl text-sm font-black transition-all border-2",
                  !filterCategory ? "bg-indigo-600 text-white border-indigo-600 shadow-xl shadow-indigo-200" : "bg-white text-gray-600 border-gray-100 hover:border-indigo-200"
                )}
              >
                All
              </button>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={cn(
                    "px-8 py-4 rounded-2xl text-sm font-black transition-all border-2",
                    filterCategory === cat ? "bg-indigo-600 text-white border-indigo-600 shadow-xl shadow-indigo-200" : "bg-white text-gray-600 border-gray-100 hover:border-indigo-200"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Places Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            {filteredPlaces.length} Destinations Found
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-[500px] bg-gray-100 rounded-[3rem] animate-pulse" />
            ))}
          </div>
        ) : filteredPlaces.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPlaces.map((place, idx) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link to={`/places/${place.id}`} className="group block bg-white rounded-[3rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-gray-50 h-full flex flex-col">
                  <div className="h-72 relative overflow-hidden">
                    <img 
                      src={place.imageUrls?.[0] || `https://picsum.photos/seed/${place.name}/800/600`} 
                      alt={place.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-6 right-6 flex flex-col gap-2 items-end">
                      <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-indigo-600 uppercase tracking-widest shadow-sm">
                        {place.category}
                      </span>
                      {place.isFeatured && (
                        <span className="px-3 py-1 bg-amber-400 rounded-full text-[10px] font-black text-amber-900 flex items-center shadow-sm">
                          <Star size={10} fill="currentColor" className="mr-1" /> FEATURED
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-10 flex-grow flex flex-col space-y-4">
                    <div className="flex items-center text-gray-400 text-xs font-black uppercase tracking-[0.2em]">
                      <MapPin size={16} className="mr-2 text-indigo-400" />
                      {cities.find(c => c.id === place.cityId)?.name || place.cityId}
                      {!stateId && (
                        <>
                          <span className="mx-2 text-gray-300">•</span>
                          {states.find(s => s.id === place.stateId)?.name}
                        </>
                      )}
                    </div>
                    <h3 className="text-3xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors tracking-tight leading-tight">{place.name}</h3>
                    <p className="text-gray-500 text-base line-clamp-3 leading-relaxed flex-grow">{place.description}</p>
                    <div className="pt-8 flex items-center justify-between border-t border-gray-50">
                      <span className="text-indigo-600 font-black text-lg">View Details</span>
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 group-hover:rotate-90">
                        <ChevronRight size={24} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-gray-50 rounded-[4rem] border-4 border-dashed border-gray-100">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white text-gray-300 mb-8 shadow-xl">
              <Search size={40} />
            </div>
            <h3 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">No destinations found</h3>
            <p className="text-xl text-gray-500 max-w-md mx-auto font-light">Try adjusting your search or category filters to find what you're looking for.</p>
            <button 
              onClick={() => {setSearchQuery(''); setFilterCategory(null);}}
              className="mt-10 px-10 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl active:scale-95"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
