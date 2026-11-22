import './App.css'
import { ProductoForm } from './components/ProductoForm'
import { ProductoLista } from './components/ProductoLista'

function App() {
  return (
    <div className="app-wrapper">
      <header className="app-header">
        <span className="app-header__tag">Firestore · Cloud Database</span>
        <h1 className="app-header__title">Inventario de Productos</h1>
      </header>

      <main className="app-content">
        <ProductoForm />
        <ProductoLista />
      </main>
    </div>
  )
}

export default App
