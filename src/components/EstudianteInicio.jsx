import React from 'react';
import { Header, Container, Button, Grid, Box } from '@cloudscape-design/components';
import { useNavigate } from 'react-router-dom';

export default function EstudianteInicio() {
  const navigate = useNavigate();

  return (
    <>
      <Header variant="h1">Estudiante, Convocante 👋</Header>

      <Grid
        gridDefinition={[
          { colspan: { default: 12, xs: 6 } },
          { colspan: { default: 12, xs: 6 } },
        ]}
      >       

        {/* Bloque 4: Acceso rápido al perfil */}
        <Container
          header={<Header variant="h2">Tu Perfil</Header>}
          footer={
            <Button variant="link" onClick={() => navigate('/estudiante/perfil')}>
              Editar perfil
            </Button>
          }
        >
          <Box variant="p">
            Accede a tus datos, edita tu información personal y mantén tu perfil actualizado.
          </Box>
        </Container>
      </Grid>
    </>
  );
}


  