import React, { useState } from 'react';
import './styles/FormularioConvocatoria.css';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../graphql/mutations';
import Cookies from 'js-cookie';

const FormularioConvocatoria = () => {
  const [form, setForm] = useState({
    rol: '',
    habilidades: '',
    experiencia: '',
    modalidad: '',
    disponibilidad: ''
  });

  const userId = Cookies.get('userId');
  const token = Cookies.get('token');

  const [editarPerfil] = useMutation(UPDATE_USER, {
    context: {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
  });

  const handleSubmit = async () => {
    const topLanguage = `
Rol: ${form.rol}
Habilidades: ${form.habilidades}
Experiencia: ${form.experiencia}
Modalidad: ${form.modalidad}
Disponibilidad: ${form.disponibilidad}
    `;
    await editarPerfil({ variables: { id: userId, input: { topLanguage } } });
    alert('Formulario enviado correctamente');
  };

  return (
    <div className="formulario-container">
      <h2>Formulario de Convocatoria</h2>
      <form>
        <input name="rol" placeholder="Rol deseado" onChange={(e) => setForm({ ...form, rol: e.target.value })} />
        <input name="habilidades" placeholder="Habilidades técnicas" onChange={(e) => setForm({ ...form, habilidades: e.target.value })} />
        <input name="experiencia" placeholder="Experiencia laboral" onChange={(e) => setForm({ ...form, experiencia: e.target.value })} />
        <input name="modalidad" placeholder="Modalidad preferida" onChange={(e) => setForm({ ...form, modalidad: e.target.value })} />
        <input name="disponibilidad" placeholder="Disponibilidad horaria" onChange={(e) => setForm({ ...form, disponibilidad: e.target.value })} />
        <button type="button" onClick={handleSubmit}>Enviar</button>
      </form>
    </div>
  );
};

export default FormularioConvocatoria;
