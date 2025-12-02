import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuthContext } from "../context/AuthContext";

const Navbar = ({ abierto, cerrarMenu }) => {
  const { usuario, logout } = useAuthContext();
  const esAdmin = usuario === "admin";
  const estaLogeado = !!usuario;

  return (
    <nav className={`${abierto ? styles.abierto : ""}`}>
      <ul className={styles.lista}>
        <li className={styles.item}>
          <Link to="/" className={styles.link} onClick={cerrarMenu}>
            Inicio
          </Link>
        </li>
        {esAdmin && (
          <li className={styles.item}>
            <Link to="/admin" className={styles.link} onClick={cerrarMenu}>
              Admin
            </Link>
          </li>
        )}

        {/* --- MOBILE: usuario + cerrar sesión --- */}
        <li className={styles.mobileUser}>
          {estaLogeado ? (
            <>
              <span className={styles.userText}>Hola, {usuario}</span>
              <button
                onClick={() => {
                  logout();
                  cerrarMenu();
                }}
                className={styles.logoutBtn}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className={styles.loginBtn}
              onClick={cerrarMenu}
            >
              Ingresá
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
