// src/components/FormularioRemoto.jsx
import React, { useEffect, useState } from 'react';

export default function FormularioRemoto() {
  const [Formulario, setFormulario] = useState(null);
 const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    rol: null,
    habilidades: '',
    experiencia: '',
    modalidad: null,
    disponibilidad: '',
    archivo: null,
  });
  

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Formulario enviado:', formData);
    alert('Convocatoria registrada correctamente.');
  };
 
  return   <FormularioConvocatoria formData={formData}setFormData={setFormData} handleSubmit={handleSubmit} ></FormularioConvocatoria>;
}
