import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../graphql/queries';
import Cookies from 'js-cookie';
import './styles/Chatter.css';

const Chatter = () => {
  const userId = Cookies.get('userId');
  const contactos = import.meta.env.VITE_CHAT_CONTACTS?.split(',') || [];
  const baseUrl = import.meta.env.VITE_CHAT_BASE_URL;

  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: { id: userId }
  });

  if (loading) return <p>Cargando chats...</p>;
  if (error) return <p>Error al obtener el usuario</p>;

  const email = data?.getUserById?.email;

  return (
    <div className="chatter-container">
      <h2>Chatter</h2>
      <div className="burbujas">
        {contactos.map((contacto, i) => (
          <a
            key={i}
            href={`${baseUrl}/?from=${email}&to=${contacto}`}
            target="_blank"
            rel="noopener noreferrer"
            className="burbuja"
          >
            Chat con {contacto}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Chatter;
