import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Navbar() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    // check if user is stored in localstorage
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/templates" className="text-xl font-bold text-indigo-600">
          TemplateHub
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/templates" className="text-gray-600 hover:text-indigo-600 text-sm">
            Templates
          </Link>
          <Link to="/favorites" className="text-gray-600 hover:text-indigo-600 text-sm">
            Favorites
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Hi, {user.name}!</span>
              <button
                onClick={handleLogout}
                className="text-sm bg-red-50 text-red-600 px-3 py-1.5 rounded hover:bg-red-100"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="text-sm text-gray-600 hover:text-indigo-600">
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm bg-indigo-600 text-white px-3 py-1.5 rounded hover:bg-indigo-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
