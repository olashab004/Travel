import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, ArrowLeft, Clock, Ticket, Calendar, ExternalLink, Landmark, TreePine, Heart, Mountain, Compass, ChevronRight, Share2, Info, Navigation, ShieldCheck } from 'lucide-react';
import { firestoreService } from '../services/firestoreService';
import { TouristPlace, State, City } from '../types';
import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const CATEGORY_ICONS = {
  'Heritage': Landmark,
  'Nature': TreePine,
  'Religious': Heart,
  'Adventure': Mountain,
  'Urban': Compass,
};

export default function PlaceDetail() {
  const { placeId } = useParams<{ placeId: string }>();
  const [place, setPlace] = useState<TouristPlace | null>(null);
  const [state, setState] = useState<State | null>(null);
  const [city, setCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!placeId) return;
      setLoading(true);
      try {
        const placeData = await firestoreService.getPlace(placeId);
        if (placeData) {
          setPlace(placeData as TouristPlace);
          const states = await firestoreService.getStates();
          setState(states?.find(s => s.id === placeData.stateId) || null);
          const cities = await firestoreService.getCities(placeData.stateId);
          setCity(cities?.find(c => c.id === placeData.cityId) || null);
        }
      } catch (error) {
        console.error('Error fetching place details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [placeId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-indigo-600 font-bold text-lg tracking-widest uppercase">Loading Destination...</p>
        </div>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-12 text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 text-red-600">
            <Info size={40} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Place not found</h1>
          <p className="text-gray-500">The destination you are looking for doesn't exist or has been removed.</p>
          <Link to="/states" className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg">
            Explore Other States
          </Link>
        </div>
      </div>
    );
  }

  const CategoryIcon = CATEGORY_ICONS[place.category as keyof typeof CATEGORY_ICONS] || Compass;

  return (
    <div className="pb-20">
      {/* Header Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={place.imageUrls?.[activeImage] || `https://picsum.photos/seed/${place.name}/1920/1080`} 
            alt={place.name} 
            className="w-full h-full object-cover brightness-[0.4] transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 flex flex-col justify-between py-12">
          <div className="flex justify-between items-start">
            <Link to={`/states/${place.stateId}`} className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-bold hover:bg-white/20 transition-all">
              <ArrowLeft size={20} className="mr-2" /> Back to {state?.name}
            </Link>
            <div className="flex space-x-3">
              <button className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all">
                <Share2 size={20} />
              </button>
              <button className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all">
                <Heart size={20} />
              </button>
            </div>
          </div>

          <div className="space-y-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <span className="px-4 py-1.5 bg-indigo-600 rounded-full text-white text-xs font-bold tracking-widest uppercase shadow-lg">
                {place.category}
              </span>
              <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-bold tracking-widest uppercase">
                {city?.name}, {state?.name}
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight"
            >
              {place.name}
            </motion.h1>

            {place.tags && place.tags.length > 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-2 pt-2"
              >
                {place.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white/80 text-[10px] font-bold uppercase tracking-widest">
                    #{tag}
                  </span>
                ))}
              </motion.div>
            )}
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center gap-8 pt-4"
            >
              <div className="flex items-center text-gray-200">
                <Clock className="mr-2 text-indigo-400" size={20} />
                <span className="text-sm font-medium">{place.timings || "Check for timings"}</span>
              </div>
              <div className="flex items-center text-gray-200">
                <Ticket className="mr-2 text-indigo-400" size={20} />
                <span className="text-sm font-medium">{place.entryFees || "Free Entry"}</span>
              </div>
              <div className="flex items-center text-gray-200">
                <Calendar className="mr-2 text-indigo-400" size={20} />
                <span className="text-sm font-medium">{place.bestTimeToVisit || "All year round"}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white rounded-[2.5rem] shadow-xl p-10 border border-gray-100">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                  <CategoryIcon size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">About this Destination</h2>
              </div>
              
              <div className="prose prose-indigo max-w-none text-gray-600 leading-relaxed text-lg">
                <ReactMarkdown>{place.description}</ReactMarkdown>
              </div>

              {(place.rituals?.length || 0) > 0 && (
                <div className="mt-12 pt-12 border-t border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <Heart className="mr-2 text-indigo-600" size={24} />
                    Daily Rituals & Poojas
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {place.rituals?.map((ritual, idx) => (
                      <div key={idx} className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50 text-indigo-900 font-medium text-sm">
                        {ritual}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(place.festivals?.length || 0) > 0 && (
                <div className="mt-12 pt-12 border-t border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <Calendar className="mr-2 text-indigo-600" size={24} />
                    Major Festivals
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {place.festivals?.map((festival, idx) => (
                      <span key={idx} className="px-4 py-2 bg-amber-50 text-amber-700 rounded-xl border border-amber-100 font-bold text-xs uppercase tracking-wider">
                        {festival}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {place.dressCode && (
                <div className="mt-12 pt-12 border-t border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <ShieldCheck className="mr-2 text-indigo-600" size={24} />
                    Dress Code & Guidelines
                  </h3>
                  <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100 text-gray-600 leading-relaxed italic">
                    "{place.dressCode}"
                  </div>
                </div>
              )}

              {place.locationUrl && (
                <div className="mt-12 pt-12 border-t border-gray-100">
                  <a 
                    href={place.locationUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-8 py-5 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all shadow-xl group"
                  >
                    <Navigation className="mr-2 group-hover:animate-bounce" size={24} />
                    Open in Google Maps
                    <ExternalLink className="ml-2 opacity-50" size={18} />
                  </a>
                </div>
              )}
            </div>

            {/* Gallery */}
            {place.imageUrls && place.imageUrls.length > 0 && (
              <div className="bg-white rounded-[2.5rem] shadow-xl p-10 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Image Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {place.imageUrls.map((url, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={cn(
                        "relative h-40 rounded-2xl overflow-hidden border-2 transition-all",
                        activeImage === idx ? "border-indigo-600 scale-95" : "border-transparent hover:scale-105"
                      )}
                    >
                      <img 
                        src={url} 
                        alt={`${place.name} ${idx + 1}`} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Nearby Attractions */}
            {place.nearbyAttractions && place.nearbyAttractions.length > 0 && (
              <div className="bg-white rounded-[2.5rem] shadow-xl p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <MapPin className="mr-2 text-indigo-600" size={20} />
                  Nearby Attractions
                </h3>
                <ul className="space-y-4">
                  {place.nearbyAttractions.map((attraction, idx) => (
                    <li key={idx} className="flex items-start group cursor-default">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-bold mr-3 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        {idx + 1}
                      </div>
                      <span className="text-gray-600 font-medium group-hover:text-gray-900 transition-colors">{attraction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* State Info Card */}
            <div className="bg-indigo-600 rounded-[2.5rem] shadow-xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative z-10 space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                    <MapPin size={20} />
                  </div>
                  <span className="text-sm font-bold tracking-widest uppercase opacity-80">Explore More</span>
                </div>
                <h3 className="text-3xl font-bold leading-tight">Discover more of {state?.name}</h3>
                <p className="text-indigo-100 text-sm leading-relaxed">
                  There are many more hidden gems waiting for you in this incredible state.
                </p>
                <Link to={`/states/${state?.id}`} className="inline-flex items-center justify-center w-full px-6 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-all shadow-lg">
                  View All Places
                  <ChevronRight size={18} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
