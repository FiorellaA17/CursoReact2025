// src/components/FormProducto.jsx
import { useState } from "react";
import { useProductosContext } from "../context/ProductosContext";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import X from "../assets/X";

const categoriasDisponibles = ["tecnología", "moda"];

const FormProducto = ({ productoInicial = {}, modo = "agregar", onCerrar }) => {
  const [producto, setProducto] = useState(productoInicial);
  const { agregarProducto, editarProducto } = useProductosContext();

  const manejarChange = (evento) => {
    const { name, value } = evento.target;
    setProducto({ ...producto, [name]: value });
  };

  const manejarSubmit = async (evento) => {
    evento.preventDefault();
    if (modo === "agregar") {
      await agregarProducto(producto);
    } else {
      await editarProducto(producto);
    }
    onCerrar();
  };

  return (
    <Modal show={true} onHide={onCerrar} centered>
      <Modal.Header className="d-flex justify-content-between align-items-center">
        <Modal.Title className="mb-0">
          {modo === "agregar" ? "Agregar Producto" : "Editar Producto"}
        </Modal.Title>
        <Button variant="light" onClick={onCerrar}>
          <X />
        </Button>
      </Modal.Header>

      <Form onSubmit={manejarSubmit}>
        <Modal.Body>
          <Row className="mb-3">
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={producto.nombre || ""}
                  onChange={manejarChange}
                  placeholder="Ingrese el nombre del producto"
                  required
                />
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  name="precio"
                  value={producto.precio || ""}
                  onChange={manejarChange}
                  placeholder="$0.00"
                  min="0"
                  step="any"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>URL de Imagen</Form.Label>
                <Form.Control
                  type="text"
                  name="imagen"
                  value={producto.imagen || ""}
                  onChange={manejarChange}
                />
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>Categoría</Form.Label>
                <Form.Select
                  name="categoria"
                  value={producto.categoria || ""}
                  onChange={manejarChange}
                  required
                >
                  <option value="">Seleccione una categoría</option>
                  {categoriasDisponibles.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              name="descripcion"
              rows={4}
              value={producto.descripcion || ""}
              onChange={manejarChange}
              placeholder="Escriba la descripción del producto aquí"
              required
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onCerrar}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            {modo === "agregar" ? "Agregar" : "Actualizar"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default FormProducto;
