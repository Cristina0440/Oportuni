import React, { useEffect, useContext } from 'react'; // 👈 Agregamos useContext aquí
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Spinner } from '@cloudscape-design/components';
import { useMutation } from '@apollo/client';
import { REGISTER_WITH_GITHUB } from '../graphql/mutations';
import { AuthContext } from '../AuthContext'; // 👈 Asegúrate que la ruta esté bien

const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
const redirectUri = import.meta.env.VITE_GITHUB_REDIRECT_URI;

export default function LoginGithub() {
  const navigate = useNavigate();
  const location = useLocation();
  const [registerUserWithGithub, { loading, error }] = useMutation(REGISTER_WITH_GITHUB);
  const user = JSON.parse(localStorage.getItem('perfilTemporal'));
  const { login } = useContext(AuthContext); 

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');

    const loginWithCode = async () => {
      if (!code) return;

      try {
        const res = await registerUserWithGithub({ variables: { code } });
        const user = res.data?.registerUserWithGithub;

        if (user?.token && user?.id) {
          login(user.token, user.id); // ✅ Usamos el login del contexto
          localStorage.setItem('perfilTemporal', JSON.stringify(user));
          navigate('/seleccion-rol');
        }
      } catch (err) {
        console.error('Error al registrar usuario con GitHub:', err);
      }
    };

    loginWithCode();
  }, [location.search, registerUserWithGithub, navigate, login]);

  const redirectToGithub = () => {
    const scope = 'read:user user:email';
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    window.location.href = githubAuthUrl;
  };

  if (loading) {
    return (
      <div style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: '#003b5c',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        fontFamily: 'sans-serif'
      }}>
        <Spinner size="large" />
        <p style={{ marginTop: '1rem' }}>Iniciando sesión...</p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
      fontFamily: 'sans-serif'
    }}>
      {/* IZQUIERDA */}
      <div style={{
        flex: 1,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem'
      }}>
        <img
          src="/logo-oportuni.png"
          alt="Logo OportUNI"
          style={{
            width: '180px',
            marginBottom: '1rem',
            display: 'block'
          }}
        />
        <p style={{ textAlign: 'center', maxWidth: '300px' }}>
          Conecta con oportunidades universitarias y encuentra tu espacio ideal.
        </p>
      </div>

      {/* DERECHA */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, #003b5c, #00a6a6)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem'
      }}>
        <h2 style={{ marginBottom: '0.5rem' }}>Bienvenido</h2>
        <p style={{ marginBottom: '2rem' }}>Ingresa con tu cuenta de GitHub</p>

        <Button variant="primary" onClick={redirectToGithub} disabled={loading}>
          Entrar con GitHub
        </Button>

        {error && (
          <p style={{ color: 'white', marginTop: '1rem' }}>
            Error: {error.message}
          </p>
        )}
      </div>
    </div>
  );
}
