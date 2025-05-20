import { useEffect, useState } from 'react';

const PROJECT_NAME = process.env.NEXT_PUBLIC_PROJECT_NAME || 'sepah_2';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load authentication state from localStorage
    const storedAuth = typeof window !== 'undefined' ? localStorage.getItem(`${PROJECT_NAME}-isAuthenticated`) : false;
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem(`${PROJECT_NAME}-user`) : false;

    if (storedAuth === 'true' && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  // Function to log in and store data
  const login = (/** @type {{ access: { token: string; }; refresh: { token: string; }; }} */ tokens, /** @type {import("react").SetStateAction<null>} */ userDoc) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${PROJECT_NAME}-access`, tokens.access.token);
      localStorage.setItem(`${PROJECT_NAME}-refresh`, tokens.refresh.token);
      localStorage.setItem(`${PROJECT_NAME}-lastLogin`, Date.now().toString());
      localStorage.setItem(`${PROJECT_NAME}-isAuthenticated`, 'true');
      localStorage.setItem(`${PROJECT_NAME}-user`, JSON.stringify(userDoc));
    }

    setIsAuthenticated(true);
    setUser(userDoc);
  };

  // @ts-ignore
  const updateUser = (userDoc) => {
    if (!userDoc || !userDoc?.id) {
      return false;
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${PROJECT_NAME}-user`, JSON.stringify(userDoc));
    }
    setUser(userDoc);
  };

  // Function to log out and clear data
  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`${PROJECT_NAME}-access`);
      localStorage.removeItem(`${PROJECT_NAME}-refresh`);
      localStorage.removeItem(`${PROJECT_NAME}-lastLogin`);
      localStorage.removeItem(`${PROJECT_NAME}-isAuthenticated`);
      localStorage.removeItem(`${PROJECT_NAME}-user`);
    }

    setIsAuthenticated(false);
    setUser(null);
  };

  return { isAuthenticated, user, login, logout, updateUser };
};

export default useAuth;
