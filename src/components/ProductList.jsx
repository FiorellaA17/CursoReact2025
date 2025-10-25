import { useState, useEffect } from "react"
import { Link } from "react-router-dom"


function ProductList({ agregarAlCarrito }) {
    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                setLoading(true)
                const response = await fetch('https://fakestoreapi.com/products')
                if (!response.ok) {
                    throw new Error('Error al obtener los productos')
                }
                const data = await response.json()
                setProductos(data)
            } catch (err) {
                setError("No se pudieron cargar los productos.")
            } finally {
                setLoading(false)
            }   
        }
        fetchProductos()
    }, [])

    if (loading) {
        return <p>Cargando productos...</p>
    } 
    if (error) {
        return <p>{error}</p>
    } 

    return (
        <div className="productos">
            <h2>Lista de Productos</h2>
            <ul>
                {productos.map((p) => (
                    <li key={p.id} className="producto-item">
                     <Link to={`/producto/${p.id}`} className="producto-link">
                        <img src={p.image} alt={p.title} className="producto-img" />
                        <div className="producto-info">
                        <span className="producto-nombre">{p.title}</span>
                        <span className="producto-precio">${p.price.toFixed(2)}</span>
                        </div>
                    </Link>
                        <button onClick={() => agregarAlCarrito({id: p.id, nombre: p.title, precio: p.price, image: p.image})}>
                            Agregar al Carrito</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default ProductList