// components/traslados/SelectorProductos.jsx
import { useState } from "react";

const SelectorProductos = ({ productos, setProductos, usuario, setUsuario }) => {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");

  const responsableBloqueado = productos.length > 0;

  const agregarProducto = () => {
    if (!nombre.trim() || !cantidad || !usuario.trim()) return;
    setProductos([
      ...productos,
      {
        nombre: nombre.trim().toLocaleUpperCase(),
        cantidad: Number(cantidad),
        usuario: usuario.trim().toLocaleUpperCase(),
      },
    ]);
    setNombre("");
    setCantidad("");
    // el nombre del responsable ya NO se limpia acá — queda fijo mientras haya productos
  };

  const quitarProducto = (index) => {
    const nuevaLista = productos.filter((_, i) => i !== index);
    setProductos(nuevaLista);
    if (nuevaLista.length === 0) {
      setUsuario(""); // si se vacía la lista completa, se libera el campo de nuevo
    }
  };

  return (
    <div className="space-y-5 mb-5">
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
          Producto a trasladar
        </label>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Nombre del producto"
              value={nombre.toLocaleUpperCase()}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full bg-gray-100 rounded-xl pl-11 pr-4 py-3 text-sm text-gray-800 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <input
            type="number"
            min={1}
            step={1}
            placeholder="Cant."
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            className="w-full sm:w-20 bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-800 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end gap-3">
          <div className="flex-1">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
              Persona que hace el traslado
              {responsableBloqueado && (
                <span className="ml-2 normal-case font-normal text-gray-400">(fijo para este traslado)</span>
              )}
            </label>
            <div className="relative">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" />
              </svg>
              <input
                type="text"
                placeholder="Nombre completo del responsable"
                value={usuario.toLocaleUpperCase()}
                onChange={(e) => setUsuario(e.target.value)}
                disabled={responsableBloqueado}
                className={`w-full rounded-xl pl-11 pr-4 py-3 text-sm border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  responsableBloqueado
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-gray-100 text-gray-800"
                }`}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={agregarProducto}
            className="bg-gray-900 text-white text-lg font-bold h-[46px] w-full sm:w-12 rounded-xl hover:bg-gray-700 transition-colors shrink-0"
          >
            +
          </button>
        </div>

        {productos.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {productos.map((p, i) => (
              <span key={i} className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wide px-3 py-2 rounded-full">
                {p.cantidad}x {p.nombre}
                <button type="button" onClick={() => quitarProducto(i)} className="text-blue-400 hover:text-blue-700" aria-label={`Quitar ${p.nombre}`}>
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectorProductos;