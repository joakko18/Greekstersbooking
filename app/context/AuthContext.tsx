'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';

// 1. Updated Interface: Added 'token' and made login accept a string
interface AuthContextType {
  isLoggedIn: boolean;
  token: string | null;
  login: (newToken: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // 2. On mount, sync the state with the browser's storage
    const savedToken = sessionStorage.getItem('token');
    
    // Strict check: make sure it's a real token and not the string "undefined"
    if (savedToken && savedToken !== "undefined") {
      setToken(savedToken);
    }
    setIsInitialized(true);
  }, []);

  // 3. Updated login: Now it expects the JWT token string
  const login = (newToken: string) => {
    if (!newToken || newToken === "undefined") return;

    sessionStorage.setItem('token', newToken);
    setToken(newToken);
    console.log("status: ✅ AuthContext updated with new token.");
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    setToken(null);
    console.log("status: 🚪 AuthContext cleared.");
  };

  return (
    <AuthContext.Provider 
      value={{ 
        token, 
        isLoggedIn: !!token, // Derived state: true if token exists
        login, 
        logout 
      }}
    >
      {/* Prevent UI flickering by waiting for initialization */}
      {isInitialized ? children : null}
    </AuthContext.Provider>
  );
};
//mirar si el login depende de la existencia del token en sessionStorage o hay un error de logica en el componente que al cerrar el modal, me arroja que estoy logueado sin tener token.
//Aparentemente en producción la solución no ha funcionado.De cualquier manera no se observan tokens por lo que debería ser algún otro tipo de problema, quizas en la logica del login en el auth.
//Mirar ultimo dialogo con gemini.
