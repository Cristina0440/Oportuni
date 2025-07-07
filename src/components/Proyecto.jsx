import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
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
} from '@cloudscape-design/components';

const Proyectos = () => {
  const { data, loading, error, refetch } = useQuery(GET_PROYECTOS);
  const [crearProyecto] = useMutation(CREAR_PROYECTO);
  const [eliminarProyecto] = useMutation(ELIMINAR_PROYECTO);

  const [nuevo, setNuevo] = useState({
    titulo: '',
    descripcion: '',
    organizador: '',
    duracion: '',
    fecha: '',
    usuarioId: ''
  });

  // CORREGIDO para Cloudscape
  const handleChange = (name) => (e) => {
    setNuevo({ ...nuevo, [name]: e.detail.value });
  };

  const handleCrear = async () => {
    await crearProyecto({ variables: { input: nuevo } });
    refetch();
    setNuevo({ titulo: '', descripcion: '', organizador: '', duracion: '', fecha: '', usuarioId: '' });
  };

  const handleEliminar = async (id) => {
    await eliminarProyecto({ variables: { id } });
    refetch();
  };

  if (loading) return <p>Cargando proyectos...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <Container header={<Header variant="h1">Gestión de Proyectos</Header>}>
        <Header variant="h2">Listado</Header>
        <ul>
          {data.proyectos.map((p) => (
            <li key={p.id} style={{ marginBottom: '0.5rem' }}>
              <strong>{p.titulo}</strong> - {p.organizador} ({p.fecha}){' '}
              <Button onClick={() => handleEliminar(p.id)} variant="icon" iconName="remove" />
            </li>
          ))}
        </ul>

        <hr style={{ margin: '2rem 0' }} />

        <Header variant="h2">Nuevo Proyecto</Header>
        <SpaceBetween size="m">
          <FormField label="Título">
            <Input name="titulo" value={nuevo.titulo} onChange={handleChange('titulo')} />
          </FormField>
          <FormField label="Descripción">
            <Input name="descripcion" value={nuevo.descripcion} onChange={handleChange('descripcion')} />
          </FormField>
          <FormField label="Organizador">
            <Input name="organizador" value={nuevo.organizador} onChange={handleChange('organizador')} />
          </FormField>
          <FormField label="Duración">
            <Input name="duracion" value={nuevo.duracion} onChange={handleChange('duracion')} />
          </FormField>
          <FormField label="Fecha">
            <Input name="fecha" type="date" value={nuevo.fecha} onChange={handleChange('fecha')} />
          </FormField>
          <FormField label="ID de Usuario">
            <Input name="usuarioId" value={nuevo.usuarioId} onChange={handleChange('usuarioId')} />
          </FormField>

          <Button variant="primary" onClick={handleCrear}>Crear Proyecto</Button>
        </SpaceBetween>
      </Container>
    </div>
  );
};

export default Proyectos;
