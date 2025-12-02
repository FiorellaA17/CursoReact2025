import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  
  const { login } = useAuthContext();
  const navigate = useNavigate();
  
  const manejarSubmit = (evento) => {
    evento.preventDefault();
    if(usuario === 'admin' && contrasenia === '1234') {
      login(usuario);
      navigate('/admin');
    } else {
      alert('Usuario o Contraseña inválido');
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={manejarSubmit}>
        <h2>Iniciar Sesión</h2>
        <label>Usuario</label>
        <input 
          type="text"
          placeholder="Ingresa tu usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <label>Contraseña</label>
        <input 
          type="password"
          placeholder="Ingresa tu contraseña"
          value={contrasenia}
          onChange={(e) => setContrasenia(e.target.value)}
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default Login;
