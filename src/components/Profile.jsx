import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_BY_ID } from '../graphql/queries';
import { UPDATE_USER } from '../graphql/mutations';
import Cookies from 'js-cookie';

const Profile = () => {
  const [form, setForm] = useState({ names: '', lastName: '', username: '' });

  const rol = localStorage.getItem('rolUsuario'); // 👈 obtenemos el rol
  const token = Cookies.get('token');
  const userId = Cookies.get('userId');

  const { data, loading, error, refetch } = useQuery(GET_USER_BY_ID, {
    variables: { id: userId }
  });

  const [updateUser] = useMutation(UPDATE_USER);

  useEffect(() => {
    if (data) console.log('[Profile] Datos recibidos:', data);
    if (error) console.error('[Profile] Error:', error);
  }, [data, error]);

  if (!token) return <p>Token no encontrado. Por favor inicia sesión.</p>;
  if (loading) return <p>Cargando perfil...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.getUserById;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const result = await updateUser({
        variables: {
          id: user.id,
          input: form
        }
      });
      console.log('[Profile] Usuario actualizado:', result);
      refetch();
    } catch (err) {
      console.error('[Profile] Error al actualizar usuario:', err);
    }
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '2rem auto',
      padding: '1.5rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      fontFamily: 'sans-serif'
    }}>
      <h2 style={{ marginBottom: '1rem' }}>
        Perfil de {rol === 'convocante' ? 'Convocante' : 'Estudiante'}
      </h2>

      <img src={user.avatarUrl} alt="avatar" width={80} style={{ borderRadius: '50%' }} />
      <p><strong>Correo:</strong> {user.email}</p>
      <p><strong>Nombre actual:</strong> {user.names}</p>

      <hr style={{ margin: '1.5rem 0' }} />

      <h3>Editar Perfil</h3>
      <input
        placeholder="Nuevo nombre"
        name="names"
        onChange={handleChange}
        style={{ display: 'block', margin: '0.5rem 0', width: '100%' }}
      />
      <input
        placeholder="Apellido"
        name="lastName"
        onChange={handleChange}
        style={{ display: 'block', margin: '0.5rem 0', width: '100%' }}
      />
      <input
        placeholder="Usuario"
        name="username"
        onChange={handleChange}
        style={{ display: 'block', margin: '0.5rem 0', width: '100%' }}
      />
      <button onClick={handleUpdate} style={{
        marginTop: '1rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#003b5c',
        color: 'white',
        border: 'none',
        borderRadius: '4px'
      }}>
        Actualizar
      </button>

      <hr style={{ margin: '2rem 0' }} />

      {rol === 'convocante' ? (
        <div>
          <h4>Zona Convocante</h4>
          <p>⚙️ Puedes gestionar tus proyectos, revisar postulantes y ver estadísticas.</p>
        </div>
      ) : (
        <div>
          <h4>Zona Estudiante</h4>
          <p>📚 Aquí verás recomendaciones, tus postulaciones y proyectos sugeridos.</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
