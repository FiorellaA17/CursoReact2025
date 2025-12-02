import { useMemo, useState } from "react";
import FormProducto from "./FormProducto";
import ModalEliminar from "./ModalEliminar";
import { useProductosContext } from "../context/ProductosContext";
import { Container, Row, Col, Image, Button, Pagination } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CirclePlus from "../assets/CirclePlus";
import SquarePen from "../assets/SquarePen";
import TrashIcon from "../assets/TrashIcon";
import SEO from "./SEO";

import styles from "./GestionProducto.module.css";

const GestionProductos = () => {
  const { productos, cargando, error, eliminarProducto } = useProductosContext();

  const [mostrarForm, setMostrarForm] = useState(false);
  const [modoFormulario, setModoFormulario] = useState("agregar");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("nuevo");

  const [page, setPage] = useState(1);
  const pageSize = 12;

  // Filtrado + Ordenamiento
  const productosFiltrados = useMemo(() => {
    if (!productos) return [];

    const q = query.trim().toLowerCase();
    let lista = productos.filter((p) => {
      const nombre = (p.nombre || "").toLowerCase();
      const desc = (p.descripcion || "").toLowerCase();
      return !q || nombre.includes(q) || desc.includes(q);
    });

    switch (sortBy) {
      case "nombre-asc":
        lista.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case "nombre-desc":
        lista.sort((a, b) => b.nombre.localeCompare(a.nombre));
        break;
      case "precio-asc":
        lista.sort((a, b) => Number(a.precio) - Number(b.precio));
        break;
      case "precio-desc":
        lista.sort((a, b) => Number(b.precio) - Number(a.precio));
        break;
      default:
        lista.sort((a, b) => Number(b.id) - Number(a.id));
        break;
    }

    return lista;
  }, [productos, query, sortBy]);

  const totalPages = Math.max(1, Math.ceil(productosFiltrados.length / pageSize));
  const productosPaginados = productosFiltrados.slice((page - 1) * pageSize, page * pageSize);

  // Eventos
  const abrirFormularioAgregar = () => {
    setModoFormulario("agregar");
    setProductoSeleccionado(null);
    setMostrarForm(true);
  };

  const abrirFormularioEditar = (producto) => {
    setModoFormulario("editar");
    setProductoSeleccionado(producto);
    setMostrarForm(true);
  };

  const cerrarFormulario = () => {
    setMostrarForm(false);
    setProductoSeleccionado(null);
  };

  const abrirModalEliminar = (producto) => {
    setProductoAEliminar(producto);
    setMostrarModalEliminar(true);
  };

  const confirmarEliminar = async (id) => {
    await eliminarProducto(id);
    toast.success("Producto eliminado correctamente!");
    setProductoAEliminar(null);
    setMostrarModalEliminar(false);
  };

  return (
    <Container className="my-4">
      <SEO title="Gestión de Productos | Panel" description="Administra tus productos." />

      {/* HEADER */}
      <div className={styles.headerContainer}>
        <div>
          <h1 className={styles.title}>Gestión de Productos</h1>
          <p className={styles.subtitle}>Crear, editar y eliminar productos</p>
        </div>

        <Button onClick={abrirFormularioAgregar} className={styles.addBtn}>
          <CirclePlus /> Agregar
        </Button>
      </div>

      {/* BARRA DE BUSQUEDA + FILTRO */}
      <div className={styles.filtersRow}>
        <input
          className={styles.searchInput}
          placeholder="Buscar por nombre o descripción..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
        />

        <select
          className={styles.modernSelect}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="nuevo">Más recientes</option>
          <option value="nombre-asc">Nombre A→Z</option>
          <option value="nombre-desc">Nombre Z→A</option>
          <option value="precio-asc">Precio ↑</option>
          <option value="precio-desc">Precio ↓</option>
        </select>
      </div>

      {/* LOADING */}
      {cargando && (
        <>
          <div className={styles.loadingShimmer}></div>
          <div className={styles.loadingShimmer}></div>
          <div className={styles.loadingShimmer}></div>
        </>
      )}

      {error && <p className="text-danger">Error: {error}</p>}

      {!cargando && !error && productosFiltrados.length === 0 && (
        <p>No se encontraron productos.</p>
      )}

      {/* LISTADO */}
      {!cargando && !error && productosPaginados.length > 0 && (
        <div className={styles.productList}>
          {productosPaginados.map((producto) => (
            <div key={producto.id} className={styles.productRow}>
              <Image
                src={producto.imagen || "/placeholder.png"}
                className={styles.productImg}
                rounded
              />

              <div className={styles.productInfo}>
                <h5 className={styles.productName}>{producto.nombre}</h5>
                <p className={styles.productDesc}>{producto.descripcion}</p>
              </div>

              <div className={styles.rightSection}>
                <span className={styles.price}>${Number(producto.precio).toFixed(2)}</span>

                <div className={styles.actionButtons}>
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    onClick={() => abrirFormularioEditar(producto)}
                  >
                    <SquarePen />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => abrirModalEliminar(producto)}
                  >
                    <TrashIcon />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINACIÓN */}
      {totalPages > 1 && (
        <Pagination className="justify-content-center mt-3">
          <Pagination.Prev disabled={page === 1} onClick={() => setPage((p) => p - 1)} />
          <Pagination.Item active>{page}</Pagination.Item>
          <Pagination.Next
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          />
        </Pagination>
      )}

      {/* FORMULARIOS Y MODALES */}
      {mostrarForm && (
        <FormProducto
          productoInicial={productoSeleccionado || {}}
          modo={modoFormulario}
          onCerrar={cerrarFormulario}
        />
      )}

      <ModalEliminar
        show={mostrarModalEliminar}
        producto={productoAEliminar}
        onCancelar={() => {
          setMostrarModalEliminar(false);
          setProductoAEliminar(null);
        }}
        onConfirmar={confirmarEliminar}
      />

      <ToastContainer position="top-right" autoClose={2000} />
    </Container>
  );
};

export default GestionProductos;
