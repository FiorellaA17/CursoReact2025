import { useState, useContext } from "react";
import { Container, Row, Col, Pagination, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useProductosContext } from "../context/ProductosContext";
import { CarritoContext } from "../context/CarritoContext";
import CardProducto from "../components/CardProducto";
import SEO from "../components/SEO";

const Productos = () => {
  const { productos, cargando, error } = useProductosContext();
  const { agregarAlCarrito } = useContext(CarritoContext);

  const [query, setQuery] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 12;

  if (cargando)
    return <p className="text-center mt-4">Cargando productos...</p>;
  if (error)
    return <p className="text-center mt-4 text-danger">{error}</p>;

  // Categorías fijas
  const categorias = ["tecnología", "moda"];

  // Filtrado de productos
  const productosFiltrados = productos.filter((p) => {
    const q = query.toLowerCase();
    const nombreMatch = p.nombre.toLowerCase().includes(q);
    const categoriaMatch =
      !categoriaSeleccionada || p.categoria === categoriaSeleccionada;
    return nombreMatch && categoriaMatch;
  });

  // Paginación
  const totalPages = Math.max(1, Math.ceil(productosFiltrados.length / pageSize));
  const productosPaginados = productosFiltrados.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Renderizado de items de paginación
  const renderPaginationItems = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - 1 && i <= page + 1)
      ) {
        items.push(
          <Pagination.Item
            key={i}
            active={i === page}
            onClick={() => setPage(i)}
          >
            {i}
          </Pagination.Item>
        );
      } else if (
        (i === page - 2 && i > 1) ||
        (i === page + 2 && i < totalPages)
      ) {
        items.push(<Pagination.Ellipsis key={`ell-${i}`} disabled />);
      }
    }
    return items;
  };

  // Agregar al carrito con notificación
  const handleAgregarAlCarrito = (producto) => {
    agregarAlCarrito(producto);
    toast.success(`${producto.nombre} agregado al carrito!`, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      style: { marginTop: "80px" },
    });
  };

  return (
    <Container className="my-4">
      <SEO
        title="Nuestros Productos"
        description="Explora nuestro catálogo de productos."
      />

      <h2 className="text-center mb-4">Nuestros Productos</h2>

      {/* FILTROS */}
      <Row className="mb-3">
        <Col xs={12} md={8}>
          <Form.Control
            type="text"
            placeholder="Buscar por nombre..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
        </Col>
        <Col xs={12} md={4} className="mt-2 mt-md-0">
          <Form.Select
            value={categoriaSeleccionada}
            onChange={(e) => {
              setCategoriaSeleccionada(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Todas las categorías</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* PRODUCTOS */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-center">
        {productosPaginados.map((producto) => (
          <Col key={producto.id}>
            <CardProducto
              producto={producto}
              agregarAlCarrito={() => handleAgregarAlCarrito(producto)}
            />
          </Col>
        ))}
      </Row>

      {/* PAGINACIÓN */}
      {totalPages > 1 && (
        <Pagination className="justify-content-center mt-3 flex-wrap">
          <Pagination.Prev
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          />
          {renderPaginationItems()}
          <Pagination.Next
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          />
        </Pagination>
      )}

      {/* Toast Container */}
      <ToastContainer />
    </Container>
  );
};

export default Productos;
