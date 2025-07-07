import React, { useState, useEffect, useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_BY_ID } from '../graphql/queries';
import { UPDATE_USER } from '../graphql/mutations';
import { AuthContext } from '../AuthContext';

const PerfilEstudiante = () => {
  const { isAuthenticated, userId } = useContext(AuthContext);
  const [form, setForm] = useState({ names: '', lastName: '', username: '' });

  if (!userId) return <p>Cargando perfil...</p>; // ⚠️ Protege la query

  const { data, loading, error, refetch } = useQuery(GET_USER_BY_ID, {
    variables: { id: userId }
  });

  const [updateUser] = useMutation(UPDATE_USER);

  useEffect(() => {
    if (data) console.log('[Estudiante] Datos recibidos:', data);
    if (error) console.error('[Estudiante] Error:', error);
  }, [data, error]);

  if (!isAuthenticated) return <p>No estás autenticado.</p>;
  if (loading) return <p>Cargando perfil...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.getUserById;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await updateUser({ variables: { id: user.id, input: form } });
      refetch();
    } catch (err) {
      console.error('[Estudiante] Error al actualizar usuario:', err);
    }
  };

  return (
    <div>
      <h2>Perfil de Estudiante</h2>
      <img src={user.avatarUrl} alt="avatar" width={80} />
      <p><strong>Correo:</strong> {user.email}</p>
      <p><strong>Nombre actual:</strong> {user.names}</p>

      <h3>Editar Perfil</h3>
      <input placeholder="Nuevo nombre" name="names" onChange={handleChange} />
      <input placeholder="Apellido" name="lastName" onChange={handleChange} />
      <input placeholder="Usuario" name="username" onChange={handleChange} />
      <button onClick={handleUpdate}>Actualizar</button>
    </div>
  );
};

export default PerfilEstudiante;
