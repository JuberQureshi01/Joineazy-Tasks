import {  useState, useEffect } from 'react';
import { db } from '../data/mockDB';
import { AuthContext } from './creatContext';


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('joineazyUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password, expectedRole) => {
    const foundUser = db.users.find(u => u.email === email);

    if (foundUser && foundUser.password === password) {
      
      if (foundUser.role !== expectedRole) {
        return 'wrong-role'; 
      }

      const userToStore = {
        id: foundUser.id,
        name: foundUser.name,
        role: foundUser.role,
        email: foundUser.email,
      };

      localStorage.setItem('joineazyUser', JSON.stringify(userToStore));
      setUser(userToStore);
      return 'success'; 
    }
    
    return 'invalid-credentials';
  };

  const logout = () => {
    localStorage.removeItem('joineazyUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};