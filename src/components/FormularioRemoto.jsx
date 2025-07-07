// src/components/FormularioRemoto.jsx
import React, { useEffect, useState } from 'react';

export default function FormularioRemoto() {
  const [Formulario, setFormulario] = useState(null);

  useEffect(() => {
    import('formulario/FormularioConvocatoria')
      .then((mod) => setFormulario(() => mod.default))
      .catch((err) => {
        console.error('Error al cargar microfrontend:', err);
      });
  }, []);

  if (!Formulario) return <p>Cargando formulario remoto...</p>;

  return <Formulario />;
}
