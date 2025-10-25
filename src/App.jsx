import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import ProductList from './components/ProductList'
import Carrito from './components/Carrito'
import ProductoDetalle from './components/ProductoDetalle'
import Checkout from './components/checkout'
import './App.css'


function App() {
  const [carrito, setCarrito] = useState([])

  const agregarAlCarrito = (producto) => {
  setCarrito((prev) => {
    const existe = prev.find((p) => p.id === producto.id)
    if (existe) {
      return prev.map((p) => 
        p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
      ) 
    } else {
      return [...prev, { ...producto, cantidad: 1 }]
    }
  })
}

  const vaciarCarrito = () => {
    setCarrito([])
  }

  return (
     <Router>
      <div className="container">
        <h1>Tienda de Ecommerce</h1>

        {/* Navbar */}
        <nav className="navbar">
          <Link to="/" className="nav-link">Productos</Link>
          <Link to="/carrito" className="nav-link">Carrito ({carrito.length})</Link>
        </nav>


        {/* Rutas */}
        <Routes>
          <Route path="/" element={<ProductList agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/carrito" element={<Carrito carrito={carrito} vaciarCarrito={vaciarCarrito} />} />
          <Route path="/producto/:id" element={<ProductoDetalle agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/checkout" element={<Checkout carrito={carrito} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
