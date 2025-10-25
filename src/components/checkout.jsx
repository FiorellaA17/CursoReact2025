import { Navigate } from "react-router-dom";

function Checkout({ carrito }) {
    if (carrito.length === 0) {
        return <Navigate to="/" />;
    }

    return (
        <div className="checkout">
            <h2>Checkout</h2>
            <p>Aquí iría el formulario de pago y detalles de envío.</p>
        </div>
    );
}

export default Checkout;