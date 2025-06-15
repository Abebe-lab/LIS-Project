import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { ExecutePostWithParams } from '../../services/api/ExecuteApiRequests';

function Logout() {
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  useEffect(() => {
    const logout = async () => {
      try {
        await ExecutePostWithParams(`users/${localStorage.getItem('user-id')}/logout`);
        localStorage.removeItem('user-id');
        localStorage.removeItem('token');
        window.location.reload(false);
        window.location.replace('/');
        setIsLoggedOut(true);
      } catch (error) {
        console.log(error);
      }
    };

    logout();
  }, []);

  return isLoggedOut ? <Navigate to="/" replace /> : null;
}

export default Logout;