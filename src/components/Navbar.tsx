import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Search, User, LogOut, Menu, X, ShieldCheck } from 'lucide-react';
import { auth, db } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setIsAdmin(userDoc.data().role === 'admin');
        } else {
          // Create user profile if it doesn't exist
          const isDefaultAdmin = currentUser.email === 'sahilola44@gmail.com';
          const role = isDefaultAdmin ? 'admin' : 'user';
          await setDoc(doc(db, 'users', currentUser.uid), {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            role: role
          });
          setIsAdmin(isDefaultAdmin);
        }
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <MapPin size={24} />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">TravelBharat</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Home</Link>
            <Link to="/states" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Explore States</Link>
            {isAdmin && (
              <Link to="/admin" className="flex items-center text-indigo-600 hover:text-indigo-700 font-semibold transition-colors">
                <ShieldCheck size={18} className="mr-1" />
                Admin
              </Link>
            )}
            
            <div className="h-6 w-px bg-gray-200 mx-2" />
            
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full border border-gray-200" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <User size={18} />
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700 hidden lg:block">{user.displayName}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button 
                onClick={handleLogin}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-sm"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn("md:hidden bg-white border-b border-gray-100 transition-all duration-200 ease-in-out overflow-hidden", isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0")}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Home</Link>
          <Link to="/states" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Explore States</Link>
          {isAdmin && (
            <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50">Admin Panel</Link>
          )}
          {user ? (
            <button 
              onClick={handleLogout}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
            >
              Sign Out
            </button>
          ) : (
            <button 
              onClick={handleLogin}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
