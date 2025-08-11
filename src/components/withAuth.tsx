import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/auth';
import axios from '../api/axios';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithAuthComponent: React.FC<P> = (props) => {
    const { isLoggedIn, logout } = useAuthStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        if (!isLoggedIn) {
          navigate('/lpp-react/login');
          return;
        }

        try {
          await axios.get(`${process.env.REACT_APP_API_URL}/login/status`);
        } catch (error) {
          logout();
          navigate('/lpp-react/login');
        } finally {
          setLoading(false);
        }
      };

      checkAuth();
    }, [isLoggedIn, navigate, logout]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};

export default withAuth;
