import { useState } from 'react';

const useSignup = (url) => {
  const [error, setError] = useState(null);

  const signup = async (user) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to signup');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      setError(error.message);
      return null;
    }
  };

  return { signup, error };
};

export default useSignup;