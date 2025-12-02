import { useState, useContext, createContext, useEffect } from 'react';

// creamos el contexto de Autenticacion 
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  // Cargar sesión desde localStorage al iniciar
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      // extraemos el nombre: "fake-token-admin" → "admin"
      const nombreUsuario = token.replace("fake-token-", "");
      setUsuario(nombreUsuario);
    }
  }, []);

  const login = (nombreUsuario) => {
    const token = `fake-token-${nombreUsuario}`;
    localStorage.setItem('authToken', token);
    setUsuario(nombreUsuario);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
