import { useState, useEffect, createContext, useContext } from "react";

export const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const API = "https://68d5d31de29051d1c0afa93e.mockapi.io/productos";

  //   CARGAR PRODUCTOS

  const cargarProductos = async () => {
    try {
      setCargando(true);
      setError(null);

      const respuesta = await fetch(API);

      if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
      }

      const datos = await respuesta.json();

      // Asegurar que todos tengan id numérico o string consistente
      const normalizados = datos.map(p => ({
        ...p,
        id: String(p.id),
      }));

      setProductos(normalizados);

    } catch (e) {
      console.error("Error al cargar productos:", e);
      setError("No se pudo cargar la lista de productos");
    } finally {
      setCargando(false);
    }
  };

  // Cargar una sola vez
  useEffect(() => {
    cargarProductos();
  }, []);

  
  //   AGREGAR
  const agregarProducto = async (producto) => {
    try {
      setError(null);

      const respuesta = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });

      if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
      }

      const nuevo = await respuesta.json();

      setProductos([...productos, { ...nuevo, id: String(nuevo.id) }]);

    } catch (e) {
      console.error("Error al agregar:", e);
      setError("Hubo un problema al agregar el producto.");
    }
  };


  //   EDITAR
  const editarProducto = async (producto) => {
    try {
      setError(null);

      const respuesta = await fetch(`${API}/${producto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });

      if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
      }

      const actualizado = await respuesta.json();

      setProductos(
        productos.map((p) =>
          p.id === String(actualizado.id) ? actualizado : p
        )
      );

    } catch (e) {
      console.error("Error al editar:", e);
      setError("Hubo un problema al editar el producto.");
    }
  };

 
  //   ELIMINAR
  const eliminarProducto = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar este producto?");

    if (!confirmar) return;

    try {
      setError(null);

      const respuesta = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      if (!respuesta.ok) {
        throw new Error("Error al eliminar");
      }

      setProductos(productos.filter((p) => p.id !== String(id)));

    } catch (e) {
      console.error(e);
      setError("Hubo un problema al eliminar el producto.");
    }
  };

  return (
    <ProductosContext.Provider
      value={{
        productos,
        cargando,
        error,
        cargarProductos,
        agregarProducto,
        editarProducto,
        eliminarProducto,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
};

export const useProductosContext = () => useContext(ProductosContext);
