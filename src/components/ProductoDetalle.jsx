import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductoDetalle({ agregarAlCarrito }) {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                if (!response.ok) {
                    throw new Error("Error al obtener el producto");
                }
                const data = await response.json();
                setProducto(data);
            } catch (err) {
                setError("No se pudo cargar el producto.");
            } finally {
                setLoading(false);
            }   
        }
        fetchProducto()
    }, [id])
    if (loading) {
        return <p>Cargando producto...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }
    if (!producto) {
        return <p>Producto no encontrado.</p>;
    }

    return (
        <div className="producto-detalle">
            <h2>{producto.title}</h2>
            <img src={producto.image} alt={producto.title} className="producto-img" /> 
            <p>{producto.description}</p>
            <span className="producto-precio">${producto.price.toFixed(2)}</span>
            <button onClick={() => agregarAlCarrito({id: producto.id, nombre: producto.title, precio: producto.price, image: producto.image})}>
                Agregar al Carrito
            </button>
        </div>
    );
}
export default ProductoDetalle;