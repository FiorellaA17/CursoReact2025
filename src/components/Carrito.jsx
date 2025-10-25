function Carrito({ carrito, vaciarCarrito }) {
    // Calcular total
    const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    return (
        <div className="carrito">
            <h2>Carrito de Compras</h2>
             {carrito.length === 0 ? (
                <p>El carrito está vacío.</p>
      ) : (
        <>
          {carrito.map((p) => (
            <div key={p.id} className="carrito-item">
              {p.image && <img src={p.image} alt={p.nombre} className="carrito-img" />}
              <span>{p.nombre}</span>
              <span>Cantidad: {p.cantidad}</span>
              <span>Subtotal: ${(p.precio * p.cantidad).toFixed(2)}</span>
            </div>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>
          <button className="vaciar" onClick={vaciarCarrito}>Vaciar Carrito</button>
        </>
            )}
        </div>
    );
}   
export default Carrito