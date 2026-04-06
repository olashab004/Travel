import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, ArrowRight, Compass, Landmark, TreePine, Heart, Mountain, Star, Users, Globe, Layers, Palmtree, PawPrint, Database, ShieldCheck } from 'lucide-react';
import { firestoreService } from '../services/firestoreService';
import { seedInitialData } from '../seedData';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { State, TouristPlace } from '../types';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const CATEGORIES = [
  { name: 'Heritage', icon: Landmark, color: 'bg-amber-100 text-amber-700' },
  { name: 'Nature', icon: TreePine, color: 'bg-emerald-100 text-emerald-700' },
  { name: 'Religious', icon: Heart, color: 'bg-orange-100 text-orange-700' },
  { name: 'Adventure', icon: Mountain, color: 'bg-blue-100 text-blue-700' },
  { name: 'Beach', icon: Palmtree, color: 'bg-cyan-100 text-cyan-700' },
  { name: 'Wildlife', icon: PawPrint, color: 'bg-purple-100 text-purple-700' },
];

export default function Home() {
  const [states, setStates] = useState<State[]>([]);
  const [featuredPlaces, setFeaturedPlaces] = useState<TouristPlace[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const isDefaultAdmin = currentUser.email === 'sahilola44@gmail.com';
        if (isDefaultAdmin) {
          setIsAdmin(true);
        } else {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          setIsAdmin(userDoc.exists() && userDoc.data().role === 'admin');
        }
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statesData, placesData] = await Promise.all([
        firestoreService.getStates(),
        firestoreService.getFeaturedPlaces()
      ]);
      setStates(statesData || []);
      setFeaturedPlaces(placesData || []);
    } catch (error) {
      console.error('Error fetching home data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSeed = async () => {
    if (window.confirm('This will seed the database with initial Indian travel data. Continue?')) {
      setSeeding(true);
      try {
        await seedInitialData();
        await fetchData();
        alert('Database seeded successfully!');
      } catch (error) {
        console.error('Seed failed:', error);
        alert('Seed failed. Check console for details.');
      } finally {
        setSeeding(false);
      }
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/states?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Taj Mahal" 
            className="w-full h-full object-cover brightness-[0.4] scale-105"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-10">
          {isAdmin && states.length === 0 && !loading && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-amber-500/90 backdrop-blur-md p-6 rounded-3xl border border-amber-400 shadow-2xl max-w-2xl mx-auto mb-8"
            >
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white">
                    <Database size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-black text-lg">Database is Empty</h3>
                    <p className="text-amber-50 text-sm">As an admin, you can seed the initial travel data for Bharat.</p>
                  </div>
                </div>
                <button 
                  onClick={handleSeed}
                  disabled={seeding}
                  className="px-6 py-3 bg-white text-amber-600 font-black rounded-xl hover:bg-amber-50 transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
                >
                  {seeding ? <Database className="animate-spin" size={20} /> : <Database size={20} />}
                  {seeding ? 'Seeding...' : 'Seed Data'}
                </button>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-600/30 text-indigo-200 text-sm font-bold tracking-wider uppercase border border-indigo-500/30 backdrop-blur-md">
              Discover the Soul of India
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[1.1]">
              Explore Bharat <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">State by State</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
              Your comprehensive digital encyclopedia for Indian tourism. From the snow-capped Himalayas to the sun-kissed backwaters of Kerala.
            </p>
          </motion.div>

          <motion.form 
            onSubmit={handleSearch}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="max-w-2xl mx-auto relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center bg-white rounded-2xl shadow-2xl p-2">
              <div className="flex-grow flex items-center px-4">
                <Search className="text-gray-400 mr-3" size={24} />
                <input 
                  type="text" 
                  placeholder="Search by name, state, city, or category..." 
                  className="w-full py-5 text-gray-800 focus:outline-none text-xl font-medium placeholder:text-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button 
                type="submit"
                className="bg-indigo-600 text-white px-10 py-5 rounded-xl font-black text-lg hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
              >
                Search
              </button>
            </div>
          </motion.form>

          {/* Stats Bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 pt-8"
          >
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-black text-white">{states.length || 18}</span>
              <span className="text-indigo-300 text-sm font-bold uppercase tracking-widest">States</span>
            </div>
            <div className="w-px h-12 bg-white/20 hidden md:block"></div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-black text-white">60+</span>
              <span className="text-indigo-300 text-sm font-bold uppercase tracking-widest">Destinations</span>
            </div>
            <div className="w-px h-12 bg-white/20 hidden md:block"></div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-black text-white">{CATEGORIES.length}</span>
              <span className="text-indigo-300 text-sm font-bold uppercase tracking-widest">Categories</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Explore by Category</h2>
          <p className="text-gray-500 mt-3 text-lg">Find destinations that match your travel style</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {CATEGORIES.map((cat, idx) => (
            <motion.div 
              key={cat.name}
              whileHover={{ y: -8 }}
              onClick={() => navigate(`/states?category=${cat.name}`)}
              className="flex flex-col items-center p-10 rounded-[2.5rem] bg-gray-50 hover:bg-white hover:shadow-2xl transition-all cursor-pointer border border-transparent hover:border-gray-100 group"
            >
              <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-sm", cat.color)}>
                <cat.icon size={40} />
              </div>
              <span className="font-black text-gray-800 text-xl tracking-tight">{cat.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Featured Destinations</h2>
            <p className="text-gray-500 mt-3 text-lg">Handpicked gems from across the subcontinent</p>
          </div>
          <Link to="/states" className="hidden md:flex items-center text-indigo-600 font-black hover:text-indigo-700 transition-colors group text-lg">
            Explore More <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={24} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            [1, 2, 3, 4].map(i => (
              <div key={i} className="h-[450px] bg-gray-100 rounded-[2.5rem] animate-pulse" />
            ))
          ) : (
            featuredPlaces.slice(0, 4).map((place, idx) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link to={`/places/${place.id}`} className="group block relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all">
                  <img 
                    src={place.imageUrls?.[0] || `https://picsum.photos/seed/${place.name}/800/1200`} 
                    alt={place.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8">
                    <div className="space-y-3 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest">
                          {place.category}
                        </span>
                        <div className="flex items-center text-amber-400">
                          <Star size={12} fill="currentColor" />
                          <span className="ml-1 text-xs font-bold text-white">Featured</span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-black text-white leading-tight">{place.name}</h3>
                      <div className="flex items-center text-gray-300 text-sm">
                        <MapPin size={14} className="mr-1 text-indigo-400" />
                        {place.cityId}
                      </div>
                      <p className="text-gray-400 text-xs line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {place.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* States Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Explore States</h2>
            <p className="text-gray-500 mt-3 text-lg">Discover the unique culture and landscapes of each state</p>
          </div>
          <Link to="/states" className="hidden md:flex items-center text-indigo-600 font-black hover:text-indigo-700 transition-colors group text-lg">
            View All States <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={24} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 bg-gray-100 rounded-[2.5rem] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {states.slice(0, 6).map((state, idx) => (
              <motion.div
                key={state.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link to={`/states/${state.id}`} className="group block relative h-[500px] rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all">
                  <img 
                    src={state.imageUrl || `https://picsum.photos/seed/${state.name}/800/1000`} 
                    alt={state.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10">
                    <div className="space-y-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center justify-between">
                        <span className="text-indigo-400 font-black text-sm tracking-[0.2em] uppercase">{state.code}</span>
                        <span className="text-white/40 text-xs font-bold">{state.region || 'India'}</span>
                      </div>
                      <h3 className="text-4xl font-black text-white tracking-tight">{state.name}</h3>
                      {state.tagline && (
                        <p className="text-indigo-300 font-bold text-sm italic">"{state.tagline}"</p>
                      )}
                      <p className="text-gray-300 text-sm line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed">
                        {state.description || "Explore the wonders of this incredible state."}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[4rem] p-16 md:p-24 relative overflow-hidden shadow-3xl">
          <div className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-24 -ml-24 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-3xl space-y-10">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
              Ready to start your <br />
              Indian adventure?
            </h2>
            <p className="text-2xl text-indigo-100 font-light leading-relaxed max-w-2xl">
              Join thousands of travelers who use TravelBharat to plan their journeys across the incredible subcontinent.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/states" className="inline-flex items-center justify-center px-12 py-5 rounded-2xl bg-white text-indigo-600 font-black text-lg hover:bg-indigo-50 transition-all shadow-2xl active:scale-95">
                Explore All States
              </Link>
              <button className="inline-flex items-center justify-center px-12 py-5 rounded-2xl bg-indigo-500/30 text-white font-black text-lg hover:bg-indigo-500/50 transition-all border border-indigo-400/30 backdrop-blur-sm active:scale-95">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
