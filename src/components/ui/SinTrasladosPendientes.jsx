// components/ui/SinTrasladosPendientes.jsx
import BotonVolver from "./BotonVolver";

function SinTrasladosPendientes() {
  return (
    <div>
      <div className="mb-4">
        <BotonVolver />
      </div>

      <div className="min-h-[240px] flex flex-col items-center justify-center rounded-[28px] border border-dashed border-gray-200 bg-white/80 p-8 text-center shadow-sm">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="inline-block"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900">No hay traslados pendientes</h2>
        <p className="mt-2 max-w-md text-sm text-gray-500">
          En este momento no hay traslados por confirmar. Revisa más tarde o consulta el historial
          para ver traslados completados y enviados.
        </p>
      </div>
    </div>
  );
}

export default SinTrasladosPendientes;