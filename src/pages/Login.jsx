import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [selectedRole, setSelectedRole] = useState('student'); 

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'student') {
        navigate('/student/dashboard');
      }
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    const loginResult = login(email, password, selectedRole);

    if (loginResult === 'invalid-credentials') {
      setError('Invalid email or password.');
    } else if (loginResult === 'wrong-role') {
      setError(`These credentials are not for a ${selectedRole}. Please switch roles and try again.`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F0F8FF]">
      
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-xl">
        
        <h1 className="text-3xl font-bold text-center text-[#1F2937] mb-4">
          Welcome to <span className="text-[#00A86B]"> Assignment & Review Dashboard</span>
        </h1>
        
        <div className="w-full flex p-1 bg-gray-200 rounded-lg mb-8">
          <button
            onClick={() => setSelectedRole('student')}
            className={`w-1/2 py-2 mr-2 rounded-md font-semibold transition-all duration-300
                        ${selectedRole === 'student' 
                          ? 'bg-[#00A86B] text-white shadow' 
                          : 'text-gray-600 hover:bg-gray-300'
                        }`}
          >
            Student
          </button>
          <button
            onClick={() => setSelectedRole('admin')}
            className={`w-1/2 py-2 rounded-md font-semibold transition-all duration-300
                        ${selectedRole === 'admin' 
                          ? 'bg-[#00A86B] text-white shadow' 
                          : 'text-gray-600 hover:bg-gray-300'
                        }`}
          >
            Professor
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-[#1F2937]"
            >
              {selectedRole === 'student' ? 'Student Email' : 'Professor Email'}
            </label>
            <input
              id="email"
              autoComplete='current-email'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         focus:outline-none focus:ring-[#00A86B] focus:border-[#00A86B]"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-[#1F2937]"
            >
              Password
            </label>
            <input
              id="password"
              autoComplete='current-password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         focus:outline-none focus:ring-[#00A86B] focus:border-[#00A86B]"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full px-4 py-3 font-semibold text-white bg-[#00A86B] rounded-lg shadow
                       transition-transform transform hover:scale-105 hover:bg-[#059669] 
                       focus:outline-none focus:ring-2 focus:ring-[#00A86B] focus:ring-opacity-50"
          >
            Login as {selectedRole === 'student' ? 'Student' : 'Professor'}
          </button>
        </form>
      </div>
    </div>
  );
}