import { useState } from "react";

function LayoutCarrito({ children }) {
    return (
        <div id="tarjeta-carrito">
            <header>
                <h1>Tienda de Ecommerce</h1>
            </header>
            <main> {children} </main>
            <footer id="footer-carrito">
                <p> &copy; 2025 Ecommerce Store </p>
            </footer>
        </div>
    );
}   

function ProductList({ agregarAlCarrito }) {
    const listaProductos = [
            { id: 1, nombre: "Producto A", precio: 100 },
            { id: 2, nombre: "Producto B", precio: 200 },
            { id: 3, nombre: "Producto C", precio: 300 },
        ];

    return (
        <div>
            <h2>Productos Disponibles</h2>
            {listaProductos.map((producto) => (
                <li key={producto.id}>
                    {producto.nombre}: ${producto.precio.toFixed(3)}
                    <button onClick={() => agregarAlCarrito(producto)}>Agregar al Carrito</button>
                </li>
            ))}
        </div>
    );
}

function Carrito({ carrito, vaciarCarrito }) {
    // Calcular total
    const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);

    return (
        <div>
            <h2>Carrito de Compras</h2>

            {carrito.length === 0 ? (
                <p>El carrito está vacío</p>
            ) : (
                <>
                    {carrito.map((producto) => (
                        <div key={producto.id}>
                            {producto.nombre}: ${producto.precio.toFixed(3)}
                        </div>
                    ))}

                    {/* Muestra el total */}
                    <div style={{ marginTop: "10px" }}>
                        <h3>Total: ${total.toFixed(3)}</h3>
                    </div>
                </>
            )}

            <button onClick={vaciarCarrito}>Vaciar Carrito</button>
        </div>
    );
}

function EcommerceCart() {

    /* Estado del carrito de compras */
    const [carrito, setCarrito] = useState([]);

    /* Función para agregar un producto al carrito */
    const agregarAlCarrito = (producto) => {
        setCarrito([...carrito, producto]);
    };

    /* Función para eliminar un producto del carrito */
    const vaciarCarrito = () => {
        setCarrito([]);
    };

return (
    <LayoutCarrito>
        <ProductList agregarAlCarrito={agregarAlCarrito} />
        <Carrito carrito={carrito} vaciarCarrito={vaciarCarrito} />
    </LayoutCarrito>
);

}; export default EcommerceCart;