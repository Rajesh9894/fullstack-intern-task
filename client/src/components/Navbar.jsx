// components/Navbar.jsx
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/templates" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm font-display">T</span>
            </div>
            <span className="font-display font-bold text-lg text-gray-900">TemplateHub</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden sm:flex items-center gap-1">
            <Link
              to="/templates"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/templates')
                  ? 'bg-brand-50 text-brand-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Templates
            </Link>
            {user && (
              <Link
                to="/favorites"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/favorites')
                    ? 'bg-brand-50 text-brand-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                ❤️ My Favorites
              </Link>
            )}
          </div>

          {/* Right side */}
          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-gray-500">
                  Hi, <span className="font-medium text-gray-800">{user.name.split(' ')[0]}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="btn-secondary text-sm py-2 px-4"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-secondary text-sm py-2 px-4">
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="sm:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="sm:hidden pb-4 space-y-2 border-t border-gray-100 pt-3">
            <Link to="/templates" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>
              Templates
            </Link>
            {user && (
              <Link to="/favorites" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>
                ❤️ My Favorites
              </Link>
            )}
            {user ? (
              <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" className="block px-3 py-2 rounded-lg text-sm text-brand-600 font-medium hover:bg-brand-50" onClick={() => setMenuOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
