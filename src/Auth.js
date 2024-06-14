import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    const jwtToken = getJwtToken();
    if (jwtToken) {
      const decodedToken = jwtDecode(jwtToken);
      setAuth(true); 
    }
  }, []);
  function getJwtToken() {
    const jwtCookie = document.cookie.split('; ').find(row => row.startsWith('jwtToken='));
    return jwtCookie ? jwtCookie.split('=')[1] : null;
  }
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
