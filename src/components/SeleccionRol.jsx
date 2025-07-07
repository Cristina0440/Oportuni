import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@cloudscape-design/components';

const SeleccionRol = () => {
  const navigate = useNavigate();

  const elegirRol = (rol) => {
    localStorage.setItem('rolUsuario', rol);

    // Redirigir a la vista correcta
    if (rol === 'estudiante') {
      navigate('/estudiante');
    } else if (rol === 'convocante') {
      navigate('/convocante');
    }
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'sans-serif',
    }}>
      <h2>¿Cuál es tu rol?</h2>

      <div style={{ margin: '1rem' }}>
        <Button onClick={() => elegirRol('estudiante')} variant="primary">
          Soy Estudiante
        </Button>
      </div>

      <div style={{ margin: '1rem' }}>
        <Button onClick={() => elegirRol('convocante')} variant="primary">
          Soy Convocante
        </Button>
      </div>
    </div>
  );
};

export default SeleccionRol;
