import React from 'react';
import Cookies from 'js-cookie';
import './styles/Chatter.css';

const Chatter = () => {
  const email = Cookies.get('email');
  const contactos = import.meta.env.VITE_CHAT_CONTACTS?.split(',') || [];
  const baseUrl = import.meta.env.VITE_CHAT_BASE_URL;

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
