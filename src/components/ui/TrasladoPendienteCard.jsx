import { confirmarTraslado } from "../../services/trasladosService";
import formatFecha from "../../utils/formatFecha";

function TrasladoPendienteCard({ traslado, usuario }) {
  return (
    <article className="bg-white rounded-[28px] shadow-sm p-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex-1">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {traslado.productos[0]?.nombre}
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
              className="rounded-2xl bg-gray-50 px-4 py-3 flex items-center justify-between"
            >
              <span>{p.cantidad} UNIDADES DE {p.nombre}</span>
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
    </article>
  );
}

export default TrasladoPendienteCard;