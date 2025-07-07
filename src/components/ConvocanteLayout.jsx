// src/componentes/ConvocanteLayout.jsx
import React from 'react';
import {
  AppLayout,
  SideNavigation,
  ContentLayout,
  Header
} from '@cloudscape-design/components';
import { Outlet, useLocation } from 'react-router-dom';
import Logout from './Logout';

export default function ConvocanteLayout() {
  const location = useLocation();

  const navigationItems = [
    { type: 'link', text: 'Inicio', href: '/convocante' },
    { type: 'link', text: 'Proyectos', href: '/convocante/proyectos' },
    { type: 'link', text: 'Convocados', href: '/convocante/convocados' },
    { type: 'link', text: 'Perfil', href: '/convocante/perfil' },
    { type: 'divider' },
  ];

  return (
    <AppLayout
      navigation={
        <SideNavigation
          header={{ text: 'OportUNI', href: '/convocante' }}
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
