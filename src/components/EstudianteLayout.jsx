// src/componentes/EstudianteLayout.jsx
import React from 'react';
import {
  AppLayout,
  SideNavigation,
  ContentLayout,
  Header
} from '@cloudscape-design/components';
import { Outlet, useLocation } from 'react-router-dom';
import Logout from './Logout';

export default function EstudianteLayout() {
  const location = useLocation();

  const navigationItems = [
    { type: 'link', text: 'Inicio', href: '/estudiante' },
    { type: 'link', text: 'Perfil', href: '/estudiante/perfil' },
    { type: 'link', text: 'Formulario Convocatoria', href: '/estudiante/formulario' },
    { type: 'link', text: 'Chat', href: '/estudiante/chatter' },
    { type: 'divider' },
  ];

  return (
    <AppLayout
      navigation={
        <SideNavigation
          header={{ text: 'OportUNI', href: '/estudiante' }}
          items={navigationItems}
          activeHref={location.pathname}
        />
      }
      content={
        <ContentLayout>
          {/* Header con logout arriba a la derecha */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
            <Logout />
          </div>

          {/* Aquí se carga la vista seleccionada */}
          <Outlet />
        </ContentLayout>
      }
      toolsHide
    />
  );
}
