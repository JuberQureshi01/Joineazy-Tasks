import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute allowedRoles={['student']} />}>
        <Route path="/student/dashboard" element={<StudentDashboard />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>

      <Route 
        path="/" 
        element={
          !user ? (
            <Navigate to="/login" replace />
          ) : user.role === 'admin' ? (
            <Navigate to="/admin/dashboard" replace />
          ) : (
            <Navigate to="/student/dashboard" replace />
          )
        } 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;