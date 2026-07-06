// pages/HistorialTraslados.jsx
import { useTrasladosFiltrados } from "../hooks/useTrasladosFiltrados";
import { agruparPorFecha } from "../utils/agruparPorFecha";
import FiltrosHistorial from "../components/traslados/FiltrosHistorial";
import BotonVolver from "../components/ui/BotonVolver";

function estiloEstado(estado) {
  if (estado === "confirmado") {
    return { texto: "Completado", clase: "bg-green-100 text-green-700" };
  }
  return { texto: "En tránsito", clase: "bg-amber-100 text-amber-700" };
}

function cantidadTotal(productos) {
  return productos.reduce((total, p) => total + p.cantidad, 0);
}

function tituloProductos(productos) {
  if (productos.length === 1) return productos[0].nombre;
  return `${productos[0].nombre} +${productos.length - 1} más`;
}

function HistorialTraslados() {
  const { traslados, cargando, filtros, setFiltros, error } = useTrasladosFiltrados();
  const grupos = agruparPorFecha(traslados);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <BotonVolver/>
        <div className="mb-8">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
            Logística y movimientos
          </p>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Historial de traslado</h1>
          <p className="text-sm text-gray-500 max-w-xl">
            Consulta el flujo de productos entre tiendas para mantener la precisión en el inventario.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 items-start">
          <FiltrosHistorial filtros={filtros} setFiltros={setFiltros} totalTraslados={traslados.length} />

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Historial según fecha</h2>
              <p className="text-xs text-gray-400">
                Ordenado por: <span className="text-blue-600 font-bold">Más recientes</span>
              </p>
            </div>

            {error && (
              <p className="text-sm text-red-500 mb-4">
                Ocurrió un error al buscar. Es posible que falte configurar un índice en Firestore.
              </p>
            )}

            {cargando && <p className="text-sm text-gray-400">Cargando...</p>}

            {!cargando && !error && traslados.length === 0 && (
              <p className="text-sm text-gray-400">No hay traslados en este rango.</p>
            )}

            {Object.entries(grupos).map(([fecha, trasladosDelDia]) => (
              <div key={fecha} className="mb-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">{fecha}</h3>
                <div className="space-y-3">
                  {trasladosDelDia.map((t) => {
                    const { texto, clase } = estiloEstado(t.estado);
                    return (
                      <div
                        key={t.id}
                        className="bg-white rounded-2xl shadow-sm p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <p className="text-sm font-bold text-gray-900">{tituloProductos(t.productos)}</p>
                            <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full ${clase}`}>
                              {texto}
                            </span>
                          </div>
                            <p className="text-sm text-gray-500 mb-2">
                          Trasladado por <span className="font-semibold text-gray-900">{t.creadoPor}</span>
                            </p>
                          <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="5" width="18" height="16" rx="2" />
                                <path d="M8 3v4M16 3v4M3 10h18" />
                              </svg>
                              {t.fechaEnvio?.toDate().toLocaleDateString("es-PE")}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 7h-9M14 17H5M17 3l3 4-3 4M7 21l-3-4 3-4" />
                              </svg>
                              Cantidad: {cantidadTotal(t.productos)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 bg-gray-50 rounded-xl px-4 py-2">
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Origen</p>
                            <p className="text-sm font-bold text-gray-900">{t.origen}</p>
                          </div>
                          <span className="text-blue-600">→</span>
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Destino</p>
                            <p className="text-sm font-bold text-gray-900">{t.destino}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistorialTraslados;