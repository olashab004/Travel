import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Save, X, Landmark, TreePine, Heart, Mountain, Compass, MapPin, Image as ImageIcon, Info, ShieldCheck, AlertCircle, Database } from 'lucide-react';
import { firestoreService } from '../services/firestoreService';
import { seedInitialData } from '../seedData';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { State, City, TouristPlace } from '../types';
import { cn } from '../lib/utils';

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [places, setPlaces] = useState<TouristPlace[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [currentPlace, setCurrentPlace] = useState<Partial<TouristPlace>>({
    name: '',
    stateId: '',
    cityId: '',
    category: 'Heritage',
    description: '',
    imageUrls: [],
    nearbyAttractions: [],
    tags: [],
    isFeatured: false,
    bestTimeToVisit: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists() && userDoc.data().role === 'admin') {
          setIsAdmin(true);
          fetchData();
        } else {
          setIsAdmin(false);
          setLoading(false);
        }
      } else {
        setIsAdmin(false);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    try {
      const [statesData, placesData] = await Promise.all([
        firestoreService.getStates(),
        firestoreService.getPlaces()
      ]);
      setStates(statesData || []);
      setPlaces(placesData || []);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSeed = async () => {
    if (window.confirm('This will seed initial states and cities. Continue?')) {
      setSeeding(true);
      try {
        await seedInitialData();
        await fetchData();
        alert('Seed completed successfully!');
      } catch (error) {
        console.error('Seed failed:', error);
        alert('Seed failed. Check console for details.');
      } finally {
        setSeeding(false);
      }
    }
  };

  const handleStateChange = async (stateId: string) => {
    setCurrentPlace({ ...currentPlace, stateId, cityId: '' });
    if (stateId) {
      const citiesData = await firestoreService.getCities(stateId);
      setCities(citiesData || []);
    } else {
      setCities([]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentPlace.id) {
        await firestoreService.updatePlace(currentPlace.id, currentPlace);
      } else {
        await firestoreService.addPlace(currentPlace);
      }
      setIsEditing(false);
      setCurrentPlace({
        name: '',
        stateId: '',
        cityId: '',
        category: 'Heritage',
        description: '',
        imageUrls: [],
        nearbyAttractions: [],
        tags: [],
        isFeatured: false,
        bestTimeToVisit: ''
      });
      fetchData();
    } catch (error) {
      console.error('Error saving place:', error);
    }
  };

  const handleDelete = async (placeId: string) => {
    if (window.confirm('Are you sure you want to delete this destination?')) {
      try {
        await firestoreService.deletePlace(placeId);
        fetchData();
      } catch (error) {
        console.error('Error deleting place:', error);
      }
    }
  };

  const handleEdit = async (place: TouristPlace) => {
    setCurrentPlace(place);
    const citiesData = await firestoreService.getCities(place.stateId);
    setCities(citiesData || []);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-indigo-600 font-bold text-lg tracking-widest uppercase">Verifying Admin Access...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-12 text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 text-red-600">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Access Denied</h1>
          <p className="text-gray-500">You do not have administrative privileges to access this panel.</p>
          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center">
            <ShieldCheck className="mr-3 text-indigo-600" size={36} />
            Admin Control Panel
          </h1>
          <p className="text-gray-500 text-lg">Manage destinations, states, and content across TravelBharat.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          {!isEditing && (
            <button 
              onClick={handleSeed}
              disabled={seeding}
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all border border-gray-200 shadow-sm disabled:opacity-50"
            >
              <Database className={cn("mr-2", seeding && "animate-spin")} size={20} />
              {seeding ? 'Seeding...' : 'Seed Initial Data'}
            </button>
          )}
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg group"
            >
              <Plus className="mr-2 group-hover:rotate-90 transition-transform" size={20} />
              Add New Destination
            </button>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              {currentPlace.id ? <Edit2 className="mr-3 text-indigo-600" size={24} /> : <Plus className="mr-3 text-indigo-600" size={24} />}
              {currentPlace.id ? 'Edit Destination' : 'Add New Destination'}
            </h2>
            <button 
              onClick={() => setIsEditing(false)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Destination Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  value={currentPlace.name}
                  onChange={(e) => setCurrentPlace({ ...currentPlace, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">State</label>
                  <select 
                    required
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                    value={currentPlace.stateId}
                    onChange={(e) => handleStateChange(e.target.value)}
                  >
                    <option value="">Select State</option>
                    {states.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">City</label>
                  <select 
                    required
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                    value={currentPlace.cityId}
                    onChange={(e) => setCurrentPlace({ ...currentPlace, cityId: e.target.value })}
                  >
                    <option value="">Select City</option>
                    {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Category</label>
                <select 
                  required
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  value={currentPlace.category}
                  onChange={(e) => setCurrentPlace({ ...currentPlace, category: e.target.value as any })}
                >
                  <option value="Heritage">Heritage</option>
                  <option value="Nature">Nature</option>
                  <option value="Religious">Religious</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Urban">Urban</option>
                  <option value="Beach">Beach</option>
                  <option value="Wildlife">Wildlife</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Description (Markdown Supported)</label>
                <textarea 
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none"
                  value={currentPlace.description}
                  onChange={(e) => setCurrentPlace({ ...currentPlace, description: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Image URLs (One per line)</label>
                <textarea 
                  rows={4}
                  placeholder="https://example.com/image1.jpg"
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none"
                  value={currentPlace.imageUrls?.join('\n')}
                  onChange={(e) => setCurrentPlace({ ...currentPlace, imageUrls: e.target.value.split('\n').filter(url => url.trim()) })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Timings</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 9:00 AM - 6:00 PM"
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                    value={currentPlace.timings}
                    onChange={(e) => setCurrentPlace({ ...currentPlace, timings: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Entry Fees</label>
                  <input 
                    type="text" 
                    placeholder="e.g. ₹50 for adults"
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                    value={currentPlace.entryFees}
                    onChange={(e) => setCurrentPlace({ ...currentPlace, entryFees: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Best Time to Visit</label>
                  <input 
                    type="text" 
                    placeholder="e.g. October to March"
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                    value={currentPlace.bestTimeToVisit}
                    onChange={(e) => setCurrentPlace({ ...currentPlace, bestTimeToVisit: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Google Maps URL</label>
                <input 
                  type="url" 
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  value={currentPlace.locationUrl}
                  onChange={(e) => setCurrentPlace({ ...currentPlace, locationUrl: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Nearby Attractions (Comma separated)</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  value={currentPlace.nearbyAttractions?.join(', ')}
                  onChange={(e) => setCurrentPlace({ ...currentPlace, nearbyAttractions: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Tags (Comma separated)</label>
                <input 
                  type="text" 
                  placeholder="e.g. historical, architecture, sunset"
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  value={currentPlace.tags?.join(', ')}
                  onChange={(e) => setCurrentPlace({ ...currentPlace, tags: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
                />
              </div>

              <div className="flex items-center space-x-3 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                <input 
                  type="checkbox" 
                  id="isFeatured"
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                  checked={currentPlace.isFeatured}
                  onChange={(e) => setCurrentPlace({ ...currentPlace, isFeatured: e.target.checked })}
                />
                <label htmlFor="isFeatured" className="text-sm font-bold text-indigo-900 cursor-pointer">
                  Feature this destination on Home Page
                </label>
              </div>
            </div>

            <div className="md:col-span-2 flex justify-end space-x-4 pt-6 border-t border-gray-100">
              <button 
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-8 py-4 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-10 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-xl flex items-center"
              >
                <Save className="mr-2" size={20} />
                Save Destination
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Places List */}
      <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100">
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-900">Existing Destinations ({places.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-400 text-xs font-bold uppercase tracking-widest">
                <th className="px-8 py-4">Destination</th>
                <th className="px-8 py-4">Location</th>
                <th className="px-8 py-4">Category</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {places.map((place) => (
                <tr key={place.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-xl overflow-hidden mr-4 shadow-sm">
                        <img 
                          src={place.imageUrls?.[0] || `https://picsum.photos/seed/${place.name}/100/100`} 
                          alt={place.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{place.name}</div>
                        <div className="text-xs text-gray-400 line-clamp-1">{place.description.substring(0, 50)}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700">{states.find(s => s.id === place.stateId)?.name}</span>
                      <span className="text-xs text-gray-400">City ID: {place.cityId}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold">
                      {place.category}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEdit(place)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(place.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {places.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                        <Landmark size={32} />
                      </div>
                      <p className="text-gray-500 font-medium">No destinations found. Add your first one!</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
