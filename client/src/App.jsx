// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Templates from './pages/Templates';
import Favorites from './pages/Favorites';

// Protected route — redirects to /login if not logged in
function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

// Public route — redirects to /templates if already logged in
function PublicRoute({ children }) {
  const token = localStorage.getItem('token');
  return !token ? children : <Navigate to="/templates" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/templates" replace />} />
            <Route
              path="/register"
              element={<PublicRoute><Register /></PublicRoute>}
            />
            <Route
              path="/login"
              element={<PublicRoute><Login /></PublicRoute>}
            />
            <Route path="/templates" element={<Templates />} />
            <Route
              path="/favorites"
              element={<PrivateRoute><Favorites /></PrivateRoute>}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
