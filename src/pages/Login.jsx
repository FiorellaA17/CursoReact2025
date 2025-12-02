import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [mostrarPass, setMostrarPass] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuthContext();
  const navigate = useNavigate();

  const manejarSubmit = (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    setTimeout(() => {
      if (usuario === "admin" && contrasenia === "1234") {
        login(usuario);
        navigate("/admin");
      } else {
        setError("Usuario o contraseña inválidos");
      }
      setCargando(false);
    }, 800);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={manejarSubmit}>
        <h2 className="title">Iniciar Sesión</h2>

        {/* Usuario */}
        <div className="input-wrapper">
          <FaUser className="icon" />
          <input
            type="text"
            placeholder="Ingresa tu usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>

        {/* Contraseña */}
        <div className="input-wrapper">
          <FaLock className="icon" />
          <input
            type={mostrarPass ? "text" : "password"}
            placeholder="Ingresa tu contraseña"
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
          />
          <span
            className="toggle-pass"
            onClick={() => setMostrarPass(!mostrarPass)}
          >
            {mostrarPass ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Error */}
        {error && <p className="error-msg">{error}</p>}

        {/* Botón */}
        <button className="btn-login" type="submit" disabled={cargando}>
          {cargando ? <div className="spinner"></div> : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  );
};

export default Login;
