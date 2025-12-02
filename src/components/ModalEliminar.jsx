import { Modal, Button } from "react-bootstrap";

const ModalEliminar = ({ show, onCancelar, onConfirmar, producto }) => {
  if (!producto) return null;

  return (
    <Modal show={show} onHide={onCancelar} centered>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estás seguro que quieres eliminar <strong>{producto.nombre}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancelar}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={() => onConfirmar(producto.id)}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminar;
