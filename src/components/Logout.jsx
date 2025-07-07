import React, { useContext } from 'react';
import Cookies from 'js-cookie';
import { Button } from '@cloudscape-design/components';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); // ✅ para limpiar el context también

  const handleLogout = () => {
    // Borra cookies y localStorage
    Cookies.remove('token');
    Cookies.remove('userId');
    localStorage.clear();

    // Limpia también el contexto global
    logout();

    // Redirige manualmente
    navigate('/login', { replace: true });
  };

  return (
    <Button onClick={handleLogout} variant="normal">
      Cerrar sesión
    </Button>
  );
};

export default Logout;
