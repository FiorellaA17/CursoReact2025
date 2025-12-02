// Se pide para la pre-entrega
import styles from './Footer.module.css';

const Footer = () => {
  
  const anioActual = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* Seccion de enlaces */}
      <ul className={styles.footerNav}>
        <li>
          <a href="#" className={styles.footerLink}>Acerca de Nosotros</a>
        </li>
        <li>
          <a href="#" className={styles.footerLink}>Política de Privacidad</a>
        </li>
      </ul>
      {/* Seccion de Copyright */}
      <p className={styles.copyright}>
        © {anioActual} Desarrollado por Fiorella. Todos los derechos reservados.
      </p>
    </footer>
  );
}

export default Footer;