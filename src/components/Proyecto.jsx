import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_PROYECTOS } from '../graphql/queries';
import { CREAR_PROYECTO, ELIMINAR_PROYECTO } from '../graphql/mutations';
import {
  Container,
  Header,
  SpaceBetween,
  FormField,
  Input,
  Button,
  Box,
  Grid,
  Modal,
} from '@cloudscape-design/components';
import FormularioRemoto from './FormularioRemoto';

const Proyectos = () => {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useQuery(GET_PROYECTOS);
  const [crearProyecto] = useMutation(CREAR_PROYECTO);
  const [eliminarProyecto] = useMutation(ELIMINAR_PROYECTO);

  const [modalVisible, setModalVisible] = useState(false);
  const [nuevo, setNuevo] = useState({
    titulo: '',
    descripcion: '',
    organizador: '',
    duracion: '',
    fecha: '',
    usuarioId: ''
  });

  const handleChange = (name) => (e) => {
    setNuevo({ ...nuevo, [name]: e.detail.value });
  };

  const handleCrear = async () => {
console.log(nuevo)
 
const camposValidos = ['titulo', 'descripcion', 'organizador', 'duracion', 'fecha', 'usuarioId'];

const limpiarYValidar = (obj) => {
  const limpio = {};

  for (const key of camposValidos) {
    if (obj.hasOwnProperty(key)) {
      limpio[key] = obj[key];
    } else {
      return null; // Falta un campo requerido
    }
  }

  return limpio;
};

const validado = limpiarYValidar(nuevo);
    await crearProyecto({ variables: { input: validado } });
    refetch();
    setModalVisible(false);
    setNuevo({
      titulo: '',
      descripcion: '',
      organizador: '',
      duracion: '',
      fecha: '',
      usuarioId: ''
    });
  };

  const handleEliminar = async (id) => {
    await eliminarProyecto({ variables: { id } });
    refetch();
  };

  if (loading) return <p>Cargando proyectos...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      {/* Cabecera y botón */}
      <Box display="flex" justifyContent="space-between" alignItems="center" margin={{ bottom: 'l' }}>
        <Header variant="h1">Mis Proyectos</Header>
        <Button variant="primary" onClick={() => setModalVisible(true)}>+ Crear Proyecto</Button>
      </Box>

      {/* Tarjetas de proyectos */}
      <Grid
        gridDefinition={[
          { colspan: { default: 6, xs: 12 } },
          { colspan: { default: 6, xs: 12 } }
        ]}
      >
        {data.proyectos.map((p) => (
          <Box
            key={p.id}
            padding="m"
            backgroundColor="white"
            borderRadius="medium"
            boxShadow="medium"
          >
            <Header variant="h3">{p.titulo}</Header>
            <p><strong>Organizador:</strong> {p.organizador}</p>
            <p><strong>Fecha:</strong> {p.fecha}</p>
            <p>{p.descripcion}</p>

            <SpaceBetween size="xs" direction="horizontal">
              <Button variant="link" onClick={() => navigate(`/convocante/proyectos/${p.id}`)}>
                Ver proyecto
              </Button>
              <Button iconName="remove" variant="icon" onClick={() => handleEliminar(p.id)} />
            </SpaceBetween>
          </Box>
        ))}
      </Grid>

      {/* Modal para crear proyecto */}
      <Modal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        header="Crear nuevo proyecto"
        footer={
          <Box float="right">
            <SpaceBetween direction="horizontal" size="s">
              <Button onClick={() => setModalVisible(false)}>Cancelar</Button>
              <Button variant="primary" onClick={handleCrear}>Crear</Button>
            </SpaceBetween>
          </Box>
        }
      >
        <SpaceBetween size="m">
          <FormularioRemoto handleSubmit={handleCrear} formData={nuevo} setFormData={setNuevo}></FormularioRemoto>
          {/* <FormField label="Título">
            <Input value={nuevo.titulo} onChange={handleChange('titulo')} />
          </FormField>
          <FormField label="Descripción">
            <Input value={nuevo.descripcion} onChange={handleChange('descripcion')} />
          </FormField>
          <FormField label="Organizador">
            <Input value={nuevo.organizador} onChange={handleChange('organizador')} />
          </FormField>
          <FormField label="Duración">
            <Input value={nuevo.duracion} onChange={handleChange('duracion')} />
          </FormField>
          <FormField label="Fecha">
            <Input type="date" value={nuevo.fecha} onChange={handleChange('fecha')} />
          </FormField>
          <FormField label="ID de Usuario">
            <Input value={nuevo.usuarioId} onChange={handleChange('usuarioId')} />
          </FormField> */}
        </SpaceBetween>
      </Modal>
    </div>
  );
};

export default Proyectos;
