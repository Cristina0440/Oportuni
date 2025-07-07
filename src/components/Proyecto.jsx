import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PROYECTOS } from '../graphql/queries';
import { CREAR_PROYECTO, ELIMINAR_PROYECTO } from '../graphql/mutations';
import FormularioConvocatoria from 'remote/FormularioConvocatoria'
import {
  Container,
  Header,
  SpaceBetween,
  FormField,
  Input,
  Button,
  Box,
} from '@cloudscape-design/components';
import FormularioRemoto from './FormularioRemoto';

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
        <FormularioRemoto></FormularioRemoto>
      </Container>
    </div>
  );
};

export default Proyectos;
