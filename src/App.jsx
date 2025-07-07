import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import LoginGithub from './components/LoginGithub';
import Profile from './components/Profile';
import Proyectos from './components/Proyecto';
import Convocatorias from './components/Convocatorias';
import Convocado from './components/Convocado';
import SeleccionRol from './components/SeleccionRol';
import PerfilConvocante from './components/PerfilConvocante';
import PerfilEstudiante from './components/PerfilEstudiante';
import ConvocanteInicio from './components/ConvocanteInicio';
import ConvocanteLayout from './components/ConvocanteLayout';
import React from 'react';

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/perfil" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/proyectos" element={isAuthenticated ? <Proyectos /> : <Navigate to="/login" />} />
        <Route path="/convocatorias" element={isAuthenticated ? <Convocatorias /> : <Navigate to="/login" />} />
        <Route path="/convocado" element={isAuthenticated ? <Convocado /> : <Navigate to="/login" />} />
        

        
        <Route path="/perfil-estudiante" element={<PerfilEstudiante />} />

        {/* Público */}
        <Route path="/login" element={<LoginGithub />} />
        <Route path="/seleccion-rol" element={<SeleccionRol />} />
        <Route
            path="/convocante/*"
            element={isAuthenticated ? <ConvocanteLayout /> : <Navigate to="/login" />}
          />
        {/* Convocante con layout persistente */}
        <Route path="/convocante" element={<ConvocanteLayout />}>
          <Route index element={<ConvocanteInicio />} /> {/* /convocante */}
          <Route path="proyectos" element={<Proyectos />} /> {/* /convocante/proyectos */}
          <Route path="perfil" element={<PerfilConvocante />} /> {/* /convocante/perfil */}
          <Route path="convocados" element={<Convocado />} /> {/* /convocante/convocados */}
        </Route>
        
      </Routes>
    </>
  );
};

export default App;
