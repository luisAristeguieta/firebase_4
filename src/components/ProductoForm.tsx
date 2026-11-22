import { useState, type SyntheticEvent } from "react";
import { crearProducto } from "../services/productoService";
import "./ProductoForm.css";

export function ProductoForm() {
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [guardando, setGuardando] = useState(false);

    const guardarProducto = async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault();

        if (!nombre.trim() || !precio || !stock) {
            alert("Por favor completa todos los campos.");
            return;
        }

        try {
            setGuardando(true);
            const nombreLimpio = nombre.trim();

            const productoId = await crearProducto(
                nombreLimpio,
                Number(precio),
                Number(stock)
            );

            console.log("Producto creado: ", productoId);
            alert(`Producto "${nombreLimpio}" guardado correctamente.`);

            setNombre("");
            setPrecio("");
            setStock("");
        } catch (error) {
            console.error("Error al guardar producto:", error);
            alert("Ocurrió un error al guardar el producto en Firestore.");
        } finally {
            setGuardando(false);
        }
    };

    return (
        <div className="form-wrapper">
            <div className="form-card">
                <h2 className="form-card__title">Registrar Producto</h2>
                <form onSubmit={guardarProducto}>
                    <div className="form-field">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            id="nombre"
                            type="text"
                            placeholder="Ej. Cuaderno A5"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="precio">Precio ($)</label>
                        <input
                            id="precio"
                            type="number"
                            placeholder="0.00"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="stock">Stock</label>
                        <input
                            id="stock"
                            type="number"
                            placeholder="0"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="form-submit" disabled={guardando}>
                        {guardando ? "Guardando..." : "Guardar"}
                    </button>
                </form>
            </div>
        </div>
    );
}
