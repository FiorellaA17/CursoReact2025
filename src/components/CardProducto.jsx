import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";

// Contenedor principal de la card
const CardWrapper = styled.div`
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  transition: 0.2s ease;
  min-height: 360px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }

  @media (max-width: 576px) {
    min-height: 320px;
  }
`;

// Contenedor para centrar la imagen y mantener proporciones
const ImagenWrapper = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;

  @media (max-width: 576px) {
    height: 150px;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

// Info de la card
const Info = styled.div`
  padding: 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Titulo = styled.h3`
  font-size: 1.2rem;
  margin: 0;
`;

const Precio = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  margin: 8px 0;
`;

const Botones = styled.div`
  display: flex;
  gap: 10px;
  margin-top: auto;
  flex-wrap: wrap;
`;

const BtnCarrito = styled.button`
  flex: 1;
  padding: 8px;
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
  transition: 0.2s;

  &:hover {
    background: #005fd1;
  }
`;

const BtnDetalles = styled(Link)`
  flex: 1;
  text-align: center;
  padding: 8px;
  border-radius: 8px;
  background: #eee;
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: 0.2s;

  &:hover {
    background: #dcdcdc;
  }
`;

const CardProducto = ({ producto, agregarAlCarrito }) => {
  return (
    <CardWrapper role="listitem">
      <ImagenWrapper>
        <Imagen src={producto.imagen} alt={producto.nombre} />
      </ImagenWrapper>
      <Info>
        <Titulo>{producto.nombre}</Titulo>
        <Precio>${producto.precio}</Precio>
        <Botones>
          <BtnCarrito
            onClick={() => agregarAlCarrito(producto)}
            aria-label={`Agregar ${producto.nombre} al carrito`}
          >
            <FaCartPlus aria-hidden="true" /> Agregar
          </BtnCarrito>
          <BtnDetalles 
            to={`/productos/${producto.id}`} 
            aria-label={`Ver detalles de ${producto.nombre}`}
          >
            Ver detalles
          </BtnDetalles>
        </Botones>
      </Info>
    </CardWrapper>
  );
};

export default CardProducto;
