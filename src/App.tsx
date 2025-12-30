import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Portfolio from './components/Portfolio';
import ProjectDetail from './components/ProjectDetail';
import AdminLogin from './components/Admin/AdminLogin';
import AdminLayout from './components/Admin/AdminLayout';
import AdminDashboard from './components/Admin/AdminDashboard';
import ProjectsManager from './components/Admin/ProjectsManager';
import SkillsManager from './components/Admin/SkillsManager';
import ContactsManager from './components/Admin/ContactsManager';
import ProfileManager from './components/Admin/ProfileManager';
import ResumeManager from './components/Admin/ResumeManager';
import ProtectedRoute from './components/Admin/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="projects" element={<ProjectsManager />} />
          <Route path="skills" element={<SkillsManager />} />
          <Route path="contacts" element={<ContactsManager />} />
          <Route path="profile" element={<ProfileManager />} />
          <Route path="resume" element={<ResumeManager />} />
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
