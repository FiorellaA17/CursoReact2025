import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";

const CardWrapper = styled.div`
  background: #ffffff;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  transition: 0.25s ease;
  border: 1px solid #ebebeb;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 22px rgba(0,0,0,0.12);
  }
`;

const ImagenWrapper = styled.div`
  width: 100%;
  height: 220px;
  background: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px;

  @media (max-width: 576px) {
    height: 180px;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const Info = styled.div`
  padding: 18px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 8px;
`;

const Titulo = styled.h3`
  font-size: 1.15rem;
  font-weight: 600;
  color: #222;
  margin: 0;
`;

const Precio = styled.p`
  font-size: 1.3rem;
  font-weight: 700;
  #0077ff;
  margin: 6px 0 10px;

 /* Efecto shimmer en tonos azules */
background: linear-gradient(
  90deg,
  #0077ff,
  #4ba8ff,
  #80c8ff,
  #0077ff
);
background-size: 250%;
-webkit-background-clip: text;
color: transparent;

animation: shimmer 3.2s ease-in-out infinite;

@keyframes shimmer {
  0% {
    background-position: 0%;
  }
  50% {
    background-position: 100%;
  }
  100% {
    background-position: 0%;
  }
}
`;

const Botones = styled.div`
  display: flex;
  gap: 12px;
  margin-top: auto;
`;

const BtnCarrito = styled.button`
  flex: 1;
  padding: 10px;
  background: #0077ff;
  border: none;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  font-size: 0.95rem;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: 0.25s ease;

  &:hover {
    background: #005fd1;
    transform: translateY(-2px);
  }
`;

const BtnDetalles = styled(Link)`
  flex: 1;
  text-align: center;
  padding: 10px;
  border-radius: 10px;
  background: #f0f0f0;
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: 0.25s ease;
  border: 1px solid #e0e0e0;

  &:hover {
    background: #e8e8e8;
    transform: translateY(-2px);
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
          <BtnCarrito onClick={() => agregarAlCarrito(producto)}>
            <FaCartPlus /> Agregar
          </BtnCarrito>

          <BtnDetalles to={`/productos/${producto.id}`}>
            Ver detalles
          </BtnDetalles>
        </Botones>
      </Info>
    </CardWrapper>
  );
};

export default CardProducto;
