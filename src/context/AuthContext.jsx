import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {

    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    console.log("Stored token:", storedToken);

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }

    setLoading(false); 
  }, []);

  return (
    <AuthContext.Provider value={{user, token, setUser, setToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
