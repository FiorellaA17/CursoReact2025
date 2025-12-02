import Carrito from "./components/Carrito";
import Header from "./components/Header";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import ProductoDetalle from "./pages/ProductoDetalle";
import Admin from "./pages/Admin";

import { Routes, Route } from "react-router-dom";
import RutaProtegida from "./components/RutaProtegida";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productos/:id" element={<ProductoDetalle />} />

        {/* Rutas protegidas */}
        <Route
          path="/carrito"
          element={
            <RutaProtegida>
              <Carrito />
            </RutaProtegida>
          }
        />
        <Route
          path="/admin"
          element={
            <RutaProtegida>
              <Admin />
            </RutaProtegida>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
