import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useQuery, useMutation, gql } from '@apollo/client';
import { GET_USER_BY_ID } from '../graphql/queries';

const GET_CONVOCATORIAS_POR_CORREO = gql`
  query GetConvocatoriasPorCorreo($correo: String!) {
    convocatoriasPorConvocado(correo: $correo) {
      id
      titulo
      descripcion
      idUsuario
      idProyecto
    }
  }
`;

const ACEPTAR_CONVOCADO = gql`
  mutation AceptarConvocado($idConvocatoria: ID!, $userId: ID!, $datosCorreo: DatosCorreoConvocatoria!) {
    aceptarConvocado(idConvocatoria: $idConvocatoria, userId: $userId, datosCorreo: $datosCorreo) {
      id
    }
  }
`;

const RECHAZAR_CONVOCADO = gql`
  mutation RechazarConvocado($idConvocatoria: ID!, $userId: ID!, $datosCorreo: DatosCorreoConvocatoria!) {
    rechazarConvocado(idConvocatoria: $idConvocatoria, userId: $userId, datosCorreo: $datosCorreo) {
      id
    }
  }
`;

const MisConvocatorias = () => {
  const userId = Cookies.get('userId');
  const [correo, setCorreo] = useState('');
  const [convocatorias, setConvocatorias] = useState([]);

  const { data: userData, loading: loadingUser } = useQuery(GET_USER_BY_ID, {
    variables: { id: userId },
    skip: !userId
  });

  const { data: convocatoriasData, loading: loadingConvocatorias, refetch } = useQuery(GET_CONVOCATORIAS_POR_CORREO, {
    variables: { correo },
    skip: !correo
  });

  const [aceptarConvocado] = useMutation(ACEPTAR_CONVOCADO);
  const [rechazarConvocado] = useMutation(RECHAZAR_CONVOCADO);

  useEffect(() => {
    if (userData?.getUserById?.email) {
      setCorreo(userData.getUserById.email);
    }
  }, [userData]);

  useEffect(() => {
    if (convocatoriasData?.convocatoriasPorConvocado) {
      setConvocatorias(convocatoriasData.convocatoriasPorConvocado);
    }
  }, [convocatoriasData]);

  const handleAccion = async (tipo, convocatoria) => {
    const variables = {
      idConvocatoria: convocatoria.id,
      userId,
      datosCorreo: {
        emailConvocado: correo,
        emailCreador: convocatoria.idUsuario,
        nombreConvocado: "Usuario",
        nombreCreador: "Admin",
        nombreProyecto: convocatoria.titulo
      }
    };

    try {
      if (tipo === 'aceptar') {
        await aceptarConvocado({ variables });
        alert("✅ Aceptado y correo enviado");
      } else {
        await rechazarConvocado({ variables });
        alert("❌ Rechazado y correo enviado");
      }
      refetch();
    } catch (err) {
      console.error(`Error al ${tipo}:`, err);
    }
  };

  if (!userId) return <p>Por favor inicia sesión primero.</p>;
  if (loadingUser || loadingConvocatorias) return <p>Cargando convocatorias...</p>;
  if (!correo) return <p>Obteniendo tu información...</p>;
  if (convocatorias.length === 0) return <p>No tienes convocatorias pendientes.</p>;

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2>📋 Mis Convocatorias Pendientes</h2>
      {convocatorias.map(c => (
        <div key={c.id} style={{
          border: '1px solid #ccc',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}>
          <h3>{c.titulo}</h3>
          <p><strong>Descripción:</strong> {c.descripcion}</p>
          <p><strong>Estado:</strong> <span style={{ color: 'blue' }}>🛈 Pendiente</span></p>
          <p>El convocante se comunicará contigo por <strong>LinkedIn</strong>.</p>
          <div>
            <button
              onClick={() => handleAccion('aceptar', c)}
              style={{ marginRight: '8px', background: 'green', color: 'white', padding: '8px', borderRadius: '4px', border: 'none' }}
            >
              Aceptar
            </button>
            <button
              onClick={() => handleAccion('rechazar', c)}
              style={{ background: 'red', color: 'white', padding: '8px', borderRadius: '4px', border: 'none' }}
            >
              Rechazar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MisConvocatorias;
