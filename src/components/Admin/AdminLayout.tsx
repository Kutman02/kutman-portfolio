import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';

function AdminLayout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className={`bg-gray-800 w-64 min-h-screen transition-all duration-300 ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white mb-8">Админ панель</h1>
          <nav className="space-y-2">
            <Link
              to="/admin/dashboard"
              className={`block px-4 py-2 rounded-lg transition-colors ${
                isActive('/admin/dashboard') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Панель управления
            </Link>
            <Link
              to="/admin/projects"
              className={`block px-4 py-2 rounded-lg transition-colors ${
                isActive('/admin/projects') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Проекты
            </Link>
            <Link
              to="/admin/skills"
              className={`block px-4 py-2 rounded-lg transition-colors ${
                isActive('/admin/skills') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Навыки
            </Link>
            <Link
              to="/admin/contacts"
              className={`block px-4 py-2 rounded-lg transition-colors ${
                isActive('/admin/contacts') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Контакты
            </Link>
            <Link
              to="/admin/profile"
              className={`block px-4 py-2 rounded-lg transition-colors ${
                isActive('/admin/profile') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Профиль
            </Link>
            <Link
              to="/admin/resume"
              className={`block px-4 py-2 rounded-lg transition-colors ${
                isActive('/admin/resume') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Резюме
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
            >
              Выход
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
