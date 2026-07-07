import BotonVolver from "../components/ui/BotonVolver";
import Cargando from "../components/ui/Cargando";
import SinTrasladosPendientes from "../components/ui/SinTrasladosPendientes";
import TrasladoPendienteCard from "../components/ui/TrasladoPendienteCard";
import { useAuth } from "../hooks/useAuth";
import { useTrasladosPendientes } from "../hooks/useTrasladosPendientes";

function TrasladosPendientes() {
  const { usuario } = useAuth();
  const { pendientes, cargando } = useTrasladosPendientes(usuario);;

  if (cargando) return <Cargando mensaje="Cargando traslados pendientes..."/>;
  if (pendientes.length === 0) return <SinTrasladosPendientes />;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl shadow-sm p-6">
        <BotonVolver/>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Gestión de inventario
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Confirmar recepción de traslados
            </h1>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl bg-blue-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                Pendientes hoy
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {pendientes.length} Traslados
              </p>
            </div>
            <div className="rounded-3xl bg-gray-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                Sucursal actual
              </p>
              <p className="mt-2 text-lg font-semibold text-gray-900">
                {usuario?.tiendaId || "Sucursal central"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {pendientes.map((t) => (
          <TrasladoPendienteCard key={t.id} traslado={t} usuario={usuario.nombre} />
        ))}
      </div>
    </div>
  );
}

export default TrasladosPendientes;