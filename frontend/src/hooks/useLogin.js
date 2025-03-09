import { useState } from 'react';

const useLogin = (url) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const data = await response.json();
      setIsLoading(false);
      return data;
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      return null;
    }
  };

  return { login, isLoading, error };
};

export default useLogin;