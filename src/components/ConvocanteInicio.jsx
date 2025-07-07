 
import React, { useState } from 'react';
import { Header, Container, Button, Grid, Box } from '@cloudscape-design/components';
import { useNavigate } from 'react-router-dom';
import FormularioConvocatoria from 'remote/FormularioConvocatoria'
export default function ConvocanteInicio() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    rol: null,
    habilidades: '',
    experiencia: '',
    modalidad: null,
    disponibilidad: '',
    archivo: null,
  });
  

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Formulario enviado:', formData);
    alert('Convocatoria registrada correctamente.');
  };
  return (
    <>
      <Header variant="h1">Bienvenido, Csonvocante 👋</Header>
      <FormularioConvocatoria formData={formData}setFormData={setFormData} handleSubmit={handleSubmit} ></FormularioConvocatoria>
      <Grid
        gridDefinition={[
          { colspan: { default: 12, xs: 6 } },
          { colspan: { default: 12, xs: 6 } },
        ]}
      >
        {/* Bloque 1: Proyectos activos */}
        <Container
          header={<Header variant="h2">Proyectos Activos</Header>}
          footer={
            <Button variant="link" onClick={() => navigate('/convocante/proyectos')}>
              Ver todos
            </Button>
          }
        >
          <Box variant="p">Tienes 4 proyectos activos actualmente.</Box>
        </Container>

        {/* Bloque 2: Últimos convocados */}
        <Container
          header={<Header variant="h2">Últimos Convocados</Header>}
          footer={
            <Button variant="link" onClick={() => navigate('/convocante/convocados')}>
              Ver detalles
            </Button>
          }
        >
          <Box variant="p">
            - Ana Pérez (Proyecto A) <br />
            - Luis Gómez (Proyecto B)
          </Box>
        </Container>

        {/* Bloque 3: Crear convocatoria */}
        <Container
          header={<Header variant="h2">¿Nuevo Proyecto?</Header>}
          footer={
            <Button variant="primary" onClick={() => navigate('/convocante/proyectos')}>
              Crear convocatoria
            </Button>
          }
        >
          <Box variant="p">
            Inicia una nueva convocatoria para atraer estudiantes con el perfil ideal.
          </Box>
        </Container>

        {/* Bloque 4: Acceso rápido al perfil */}
        <Container
          header={<Header variant="h2">Tu Perfil</Header>}
          footer={
            <Button variant="link" onClick={() => navigate('perfil-convocante')}>
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
