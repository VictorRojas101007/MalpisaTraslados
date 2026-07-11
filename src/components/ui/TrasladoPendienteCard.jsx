// import { serverTimestamp } from "firebase/firestore";
import { confirmarTraslado, editarProductosTrasladados, eliminarTraslado } from "../../services/trasladosService";
import formatFecha from "../../utils/formatFecha";
import { useState } from "react";

function TrasladoPendienteCard({ traslado, usuario }) {

  // eslint-disable-next-line no-unused-vars
  const [indiceEditando, setIndiceEditando] = useState(null);
  const [productoEditado, setProductoEditado] = useState(traslado.productos[0] || []);

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("Estas seguro de eliminar este traslado?");
    if (!confirmar) return;

    try {
      await eliminarTraslado(id);
    } catch (error){
      console.error("Error al eliminar traslado:", error);
      alert("No se pudo eliminar el traslado");
    }
  };

  const iniciarEdicion = (producto, index) => {
    setIndiceEditando(index),
    setProductoEditado({
      nombre:producto.nombre || "",
      cantidad:producto.cantidad,
      estado:producto.estado || "",
    })
  }
  const cancelarEdicion = () => {
    setIndiceEditando(null);
    setProductoEditado({
      nombre:"",
      cantidad:"",
      estado:"",
    });
  }

  const handleChangeProduct =(campo, valor) => {
    setProductoEditado({
      ...productoEditado,
      [campo]: valor,
    })
  };

  const guardarEdicion = async () => {
  try {
    const productosActualizados = traslado.productos.map((producto, index) =>
      index === indiceEditando
        ? {
            ...producto,
            nombre: productoEditado.nombre.trim().toUpperCase(),
            cantidad: Number(productoEditado.cantidad),
          }
        : producto
    );

    await editarProductosTrasladados(traslado.id, {
      productos: productosActualizados,
    });

    alert("Producto actualizado");
    cancelarEdicion();
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    alert("No se pudo actualizar el producto");
  }
};


  

    return (
    <article className="bg-white rounded-[28px] shadow-sm p-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex-1">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {traslado.productos[0]?.["nombre"] || ""}
              </h2>
                <p className="text-sm text-gray-500">
                  Trasladado por <span className="font-semibold text-gray-900">{traslado.creadoPor}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Fecha <span className="font-semibold text-gray-900">{formatFecha(traslado.fechaEnvio)}</span>
                </p>
            </div>
          </div>

          <div className="grid gap-2 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-gray-100 text-gray-500">
                →
              </span>
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-gray-400">Origen</p>
                <p className="font-semibold text-gray-900">{traslado.origen}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-gray-100 text-gray-500">
                ↪
              </span>
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-gray-400">Destino</p>
                <p className="font-semibold text-gray-900">{traslado.destino}</p>
              </div>
            </div>
          </div>
        </div>

<ul className="mt-4 grid gap-2 text-sm text-gray-600">
  {traslado.productos.map((p, i) => (
    <li
      key={i}
      className="rounded-2xl bg-gray-50 px-4 py-3"
    >
      {indiceEditando === i ? (
        <div className="space-y-3">
          <input
            type="text"
            value={productoEditado.nombre.trim().toUpperCase()}
            onChange={(e) => handleChangeProduct("nombre", e.target.value.trim().toUpperCase())}
            placeholder="Nombre del producto"
            className="w-full rounded-xl bg-white px-4 py-3 text-sm"
          />

          <input
            type="number"
            min="1"
            value={productoEditado.cantidad}
            onChange={(e) => handleChangeProduct("cantidad", e.target.value)}
            placeholder="Cantidad"
            className="w-full rounded-xl bg-white px-4 py-3 text-sm"
          />

          <div className="flex gap-2">
            <button
              type="button"
              onClick={guardarEdicion}
              className="rounded-xl bg-blue-600 px-4 py-2 text-white"
            >
              Guardar
            </button>

            <button
              type="button"
              onClick={cancelarEdicion}
              className="rounded-xl bg-gray-300 px-4 py-2 text-gray-800"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-4">
          <span>{p.cantidad} UNIDAD(ES) DE {p.nombre}</span>

          <button
            type="button"
            onClick={() => iniciarEdicion(p, i)}
            className="rounded-xl bg-gray-900 px-4 py-2 text-white"
          >
            Editar
          </button>
        </div>
      )}
    </li>
  ))}
</ul>
      </div>

    <button
      type="submit"
      onClick={() => confirmarTraslado(traslado.id, usuario)}
      className="w-full rounded-3xl bg-blue-600 px-6 py-4 text-sm font-bold text-white transition hover:bg-blue-700 sm:w-auto animate-[float-button_2.5s_ease-in-out_infinite]"
    >
      Confirmar Recepción
    </button>
    <button
      type="submit"
      onClick={() => handleEliminar(traslado.id)}
      className="w-full rounded-3xl bg-gray-600 px-6 py-4 text-sm font-bold text-white transition hover:bg-gray-700 sm:w-auto animate-[float-button_2.5s_ease-in-out_infinite]"
    >
      Eliminar Traslado
    </button>
    </article>
  );
}

export default TrasladoPendienteCard;





    
  
  
  

  