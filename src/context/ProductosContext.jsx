import { useState, useEffect, createContext, useContext } from "react";

export const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const API = "https://692f33a791e00bafccd6e6e4.mockapi.io/productos";

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

  useEffect(() => {
    cargarProductos();
  }, []);

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
