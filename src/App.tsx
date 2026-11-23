import { useState } from 'react'
import './App.css'
import { ProductoForm } from './components/ProductoForm'
import { ProductoLista } from './components/ProductoLista'
import type { Producto } from './services/productoService'

function App() {
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [recargarKey, _setRecargarKey] = useState(0);

  const seleccionarProducto = (producto: Producto) => {
    console.log("Producto seleccionado para editar:", producto);
    setProductoSeleccionado(producto);
  };

  console.log("Modo:", productoSeleccionado ? "EDITAR" : "CREAR");

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <span className="app-header__tag">Firestore · Cloud Database</span>
        <h1 className="app-header__title">Inventario de Productos</h1>
      </header>

      <main className="app-content">
        <ProductoForm />
        <ProductoLista
          onSeleccionarProducto={seleccionarProducto}
          recargarKey={recargarKey}
        />
      </main>
    </div>
  )
}

export default App
