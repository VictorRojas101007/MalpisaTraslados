// components/traslados/FiltrosHistorial.jsx
import { useState } from "react";
import  {parseFechaLocal}  from "../../utils/parseFechaLocal";

const Tiendas = ["Tienda Malpisa", "Tienda Color Centro", "Almacen Prisma"];

function toInputDate(date) {
  if (!date) return "";
  return date.toISOString().split("T")[0];
}

function FiltrosHistorial({ filtros, setFiltros, totalTraslados }) {
  const [desde, setDesde] = useState(toInputDate(filtros.fechaDesde));
  const [hasta, setHasta] = useState(toInputDate(filtros.fechaHasta));
  const [origen, setOrigen] = useState(filtros.tiendaOrigen || "");
  const [destino, setDestino] = useState(filtros.tiendaDestino || "");

  const handleActualizar = () => {
    setFiltros({
      fechaDesde: desde ? parseFechaLocal(desde) : null,
      fechaHasta: hasta ? parseFechaLocal(hasta) : null,
      tiendaOrigen: origen || null,
      tiendaDestino: destino || null,
    });
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-3xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M7 12h10M10 18h4" />
          </svg>
          <h2 className="text-base font-bold text-gray-900">Filtros de búsqueda</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
              Fecha desde
            </label>
            <input
              type="date"
              value={desde}
              onChange={(e) => setDesde(e.target.value)}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-800 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
              Fecha hasta
            </label>
            <input
              type="date"
              value={hasta}
              onChange={(e) => setHasta(e.target.value)}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-800 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
              Tienda origen
            </label>
            <div className="relative">
              <select
                value={origen}
                onChange={(e) => setOrigen(e.target.value)}
                className="w-full appearance-none bg-gray-100 rounded-xl px-4 py-3 pr-10 text-sm text-gray-800 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar origen</option>
                {Tiendas.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
              Tienda destino
            </label>
            <div className="relative">
              <select
                value={destino}
                onChange={(e) => setDestino(e.target.value)}
                className="w-full appearance-none bg-gray-100 rounded-xl px-4 py-3 pr-10 text-sm text-gray-800 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar destino</option>
                 {Tiendas.filter((p) => p !== origen).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
              </select>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>

          <button
            type="button"
            onClick={handleActualizar}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            Actualizar historial
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm p-6 text-center">
        <div className="w-12 h-12 mx-auto rounded-xl bg-gray-100 flex items-center justify-center mb-3">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M3 7l2-4h14l2 4" />
          </svg>
        </div>
        <p className="text-sm font-medium text-gray-900 mb-1">Total traslados</p>
        <p className="text-3xl font-bold text-blue-600 mb-1">{totalTraslados}</p>
        <p className="text-xs text-gray-400 uppercase tracking-wide">En este resultado</p>
      </div>
    </div>
  );
}

export default FiltrosHistorial;