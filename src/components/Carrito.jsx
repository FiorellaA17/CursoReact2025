// src/components/Carrito.jsx
import { useContext, useState, useMemo } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { Button, Modal, Row, Col, ListGroup, Image, Container } from "react-bootstrap";
import { FaTrashAlt, FaCreditCard } from "react-icons/fa";
import { toast } from "react-toastify";
import confetti from "canvas-confetti";

const Carrito = () => {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useContext(CarritoContext);

  const [showModal, setShowModal] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [showVaciarModal, setShowVaciarModal] = useState(false);
  const [showFinalizarModal, setShowFinalizarModal] = useState(false);

  const abrirModal = (indice) => {
    setProductoAEliminar(indice);
    setShowModal(true);
  };
  const cerrarModal = () => {
    setProductoAEliminar(null);
    setShowModal(false);
  };
  const confirmarEliminar = () => {
    eliminarDelCarrito(productoAEliminar);
    toast.success("Producto eliminado del carrito");
    cerrarModal();
  };

  const abrirVaciarModal = () => setShowVaciarModal(true);
  const cerrarVaciarModal = () => setShowVaciarModal(false);
  const confirmarVaciar = () => {
    vaciarCarrito();
    toast.success("Carrito vaciado correctamente");
    cerrarVaciarModal();
  };

  const finalizarCompra = () => {
    // Vaciar carrito
    vaciarCarrito();

    // Mostrar modal de éxito
    setShowFinalizarModal(true);

    // Lanzar confeti animado
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } });
    }, 250);
  };

  const cerrarFinalizarModal = () => setShowFinalizarModal(false);

  const total = useMemo(() => {
    return carrito.reduce((acc, p) => acc + Number(p.precio), 0);
  }, [carrito]);

  // Render vacío solo si no hay productos y no se está mostrando el modal de éxito
  if (carrito.length === 0 && !showFinalizarModal)
    return (
      <Container className="my-4 text-center">
        <h2>Tu carrito está vacío</h2>
        <p>Agrega productos para comenzar tu compra.</p>
      </Container>
    );

  return (
    <Container className="my-4">
      <h2 className="mb-4">Carrito de Compras</h2>

      <ListGroup variant="flush">
        {carrito.map((producto, indice) => (
          <ListGroup.Item key={indice}>
            <Row className="align-items-center">
              <Col xs={3} sm={2} className="d-flex justify-content-center">
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={producto.imagen}
                    alt={producto.nombre}
                    fluid
                    style={{ objectFit: "contain", maxHeight: "100%", maxWidth: "100%" }}
                  />
                </div>
              </Col>

              <Col xs={5} sm={6}>
                <p className="mb-1">{producto.nombre}</p>
                <small>${producto.precio}</small>
              </Col>

              <Col xs={4} sm={4} className="text-end">
                <Button
                  variant="outline-danger"
                  onClick={() => abrirModal(indice)}
                  aria-label={`Eliminar ${producto.nombre}`}
                >
                  <FaTrashAlt />
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <hr />

      <Row className="align-items-center mt-3">
        <Col xs={12} md={4}>
          <h5>Total: ${total.toFixed(2)}</h5>
        </Col>
        <Col
          xs={12}
          md={8}
          className="text-md-end mt-2 mt-md-0 d-flex justify-content-md-end gap-2"
        >
          <Button variant="danger" onClick={abrirVaciarModal}>
            Vaciar carrito
          </Button>
          <Button variant="success" onClick={finalizarCompra}>
            <FaCreditCard className="me-1" />
            Finalizar compra
          </Button>
        </Col>
      </Row>

      {/* Modal eliminar producto */}
      <Modal show={showModal} onHide={cerrarModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro que deseas eliminar este producto?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmarEliminar}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal vaciar carrito */}
      <Modal show={showVaciarModal} onHide={cerrarVaciarModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar vaciado</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro que deseas vaciar todo el carrito?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarVaciarModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmarVaciar}>
            Vaciar carrito
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal finalizar compra con confeti */}
      <Modal show={showFinalizarModal} onHide={cerrarFinalizarModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>¡Compra realizada con éxito!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <h4>🎉 Gracias por tu compra 🎉</h4>
          <p>Tu compra se completó correctamente.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={cerrarFinalizarModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Carrito;
