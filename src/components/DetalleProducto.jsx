import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import styled, { keyframes } from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet";
import { FaCartPlus } from "react-icons/fa";
import { useCarritoContext } from "../context/CarritoContext";

// Animaciones
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled-components
const Precio = styled.h3`
  font-size: 1.8rem;
  font-weight: bold;
  color: #1e88e5;
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const DetallesLista = styled.ul`
  padding-left: 1.2rem;
  margin-top: 1rem;
  color: #555;
  list-style-type: disc;

  @media (max-width: 480px) {
    padding-left: 0.8rem;
    font-size: 0.9rem;
  }
`;

const ImagenContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  animation: ${fadeIn} 0.6s ease forwards;
`;

const BtnCarrito = styled.button`
  width: 100%;
  padding: 10px 0;
  background: #0077ff;
  border: none;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 0.95rem;
  transition: 0.2s;

  &:hover {
    background: #005fd1;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 8px 0;
  }
`;

const CardDetalle = styled(Card)`
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border-radius: 12px;
  animation: ${fadeIn} 0.5s ease forwards;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const BtnVolver = styled.button`
  background: none;
  border: none;
  color: #333;
  font-weight: 500;
  margin-bottom: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 1rem;
  transition: color 0.2s;

  &:hover {
    color: #ff4757; 
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useCarritoContext();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    setCargando(true);
    fetch(`https://68d5d31de29051d1c0afa93e.mockapi.io/productos/${id}`)
      .then(res => res.json())
      .then(data => {
        setProducto(data);
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, [id]);

  const handleAgregarCarrito = () => {
    if (!producto) return;
    agregarAlCarrito(producto);
    toast.success(`${producto.nombre} agregado al carrito!`);
  };

  if (cargando) return (
    <Container className="my-4 text-center">
      <p>Cargando producto...</p>
    </Container>
  );

  if (!producto) return (
    <Container className="my-4 text-center">
      <p>Producto no encontrado.</p>
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>Volver</button>
    </Container>
  );

  const detalles = producto.descripcion ? producto.descripcion.split("\n") : [];

  return (
    <Container className="my-4">
      <Helmet>
        <title>{producto.nombre} | Detalle del Producto</title>
        <meta name="description" content={producto.descripcion || "Detalle del producto"} />
      </Helmet>

      <BtnVolver onClick={() => navigate(-1)}>
        ← Volver
      </BtnVolver>

      <CardDetalle>
        <Row className="align-items-center">
          {/* Imagen */}
          <Col xs={12} md={6}>
            <ImagenContainer>
              <Image 
                src={producto.imagen || "/placeholder.png"} 
                alt={producto.nombre} 
                fluid 
                rounded
                style={{ maxHeight: '400px', objectFit: 'contain', width: '100%' }}
              />
            </ImagenContainer>
          </Col>

          {/* Detalles */}
          <Col xs={12} md={6}>
            <h2>{producto.nombre}</h2>
            <Precio>${Number(producto.precio).toFixed(2)}</Precio>
            <DetallesLista>
              {detalles.map((linea, idx) => (
                <li key={idx}>{linea}</li>
              ))}
            </DetallesLista>

            <BtnCarrito onClick={handleAgregarCarrito} aria-label={`Agregar ${producto.nombre} al carrito`}>
              <FaCartPlus /> Agregar al carrito
            </BtnCarrito>
          </Col>
        </Row>
      </CardDetalle>

      {/* Toast */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ marginTop: '80px', zIndex: 9999 }}
      />
    </Container>
  );
};

export default DetalleProducto;
