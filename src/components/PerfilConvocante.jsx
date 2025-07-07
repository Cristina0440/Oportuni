import React, { useState, useEffect, useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_BY_ID } from '../graphql/queries';
import { UPDATE_USER } from '../graphql/mutations';
import { AuthContext } from '../AuthContext';
import {
  Container,
  Header,
  FormField,
  Input,
  Button,
  Box,
  SpaceBetween,
  Alert
} from '@cloudscape-design/components';

const PerfilConvocante = () => {
  const { isAuthenticated, userId } = useContext(AuthContext);
  const [form, setForm] = useState({
    names: '',
    lastName: '',
    username: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const { data, loading, error, refetch } = useQuery(GET_USER_BY_ID, {
    variables: { id: userId },
    skip: !userId
  });

  const [updateUser] = useMutation(UPDATE_USER);

  useEffect(() => {
    if (data?.getUserById) {
      const { names, lastName, username } = data.getUserById;
      setForm({ names: names ?? '', lastName: lastName ?? '', username: username ?? '' });
    }
  }, [data]);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.detail.value });
  };

  const handleUpdate = async () => {
    try {
      await updateUser({ variables: { id: userId, input: form } });
      refetch();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error('Error al actualizar usuario:', err);
    }
  };

  if (!isAuthenticated) return <p>No estás autenticado.</p>;
  if (!userId || loading) return <p>Cargando perfil...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.getUserById;

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <Container header={<Header variant="h1">Perfil de Convocante</Header>}>
        {showSuccess && (
          <Alert statusIconAriaLabel="Éxito" type="success" dismissible>
            Perfil actualizado correctamente.
          </Alert>
        )}

        <Box display="flex" alignItems="center" margin={{ bottom: 's' }}>
          <img
            src={user.avatarUrl || 'https://via.placeholder.com/100'}
            alt="avatar"
            width={80}
            style={{ borderRadius: '50%', marginRight: '1rem' }}
          />
          <div>
            <p><strong>Correo:</strong> {user.email}</p>
            <p><strong>Nombre actual:</strong> {user.names}</p>
          </div>
        </Box>

        <hr style={{ margin: '2rem 0' }} />

        <Header variant="h2">Editar Perfil</Header>
        <SpaceBetween size="m">
          <FormField label="Nuevo nombre">
            <Input
              name="names"
              value={form.names}
              onChange={handleChange('names')}
              placeholder="Nuevo nombre"
            />
          </FormField>

          <FormField label="Apellido">
            <Input
              name="lastName"
              value={form.lastName}
              onChange={handleChange('lastName')}
              placeholder="Apellido"
            />
          </FormField>

          <FormField label="Usuario">
            <Input
              name="username"
              value={form.username}
              onChange={handleChange('username')}
              placeholder="Usuario"
            />
          </FormField>

          <Button variant="primary" onClick={handleUpdate}>
            Actualizar
          </Button>
        </SpaceBetween>
      </Container>
    </div>
  );
};

export default PerfilConvocante;
