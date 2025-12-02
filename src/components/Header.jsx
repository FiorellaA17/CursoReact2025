import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import styles from "./Header.module.css";
import BagIcon from "../assets/BagIcon";
import { CarritoContext } from "../context/CarritoContext";
import { useAuthContext } from "../context/AuthContext";

const Header = () => {
  const { carrito } = useContext(CarritoContext);
  const { usuario, logout } = useAuthContext();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const contadorEnCarrito = carrito.length;

  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  const cerrarMenu = () => setMenuAbierto(false);

  const estaLogeado = !!usuario;

  return (
    <header className={styles.header}>
      {/* LOGO */}
      <Link to="/" className={styles.logo}>TIENDA</Link>

      {/* NAVBAR */}
      <Navbar abierto={menuAbierto} cerrarMenu={cerrarMenu} />

      {/* ZONA DERECHA */}
      <div className={styles.rightZone}>
        {estaLogeado && (
          <span className={styles.userTextDesktop}>Hola, {usuario}</span>
        )}

        {estaLogeado ? (
          <button onClick={logout} className={styles.logoutBtnDesktop}>
            Cerrar sesión
          </button>
        ) : (
          <Link to="/login" className={styles.loginBtnDesktop}>Ingresá</Link>
        )}

        {/* CARRITO */}
        <Link to="/carrito" className={styles.carritoWrapper}>
          <BagIcon className={styles.icono} />
          {contadorEnCarrito > 0 && (
            <span className={styles.badge}>{contadorEnCarrito}</span>
          )}
        </Link>

        {/* HAMBURGUESA */}
        <button className={styles.burger} onClick={toggleMenu}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
