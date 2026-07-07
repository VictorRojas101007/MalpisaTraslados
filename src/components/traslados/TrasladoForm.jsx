// components/traslados/TrasladoForm.jsx
import SelectorProductos from "./SelectorProductos";
import { useState } from "react";
import { crearTraslado } from "../../services/trasladosService";
import BotonVolver from "../ui/BotonVolver";
import { useNavigate } from "react-router-dom";

const Tiendas = ["Tienda Malpisa", "Tienda Color Centro", "Almacen Prisma"];

const selectClasses =
  "w-full appearance-none bg-gray-100 rounded-xl px-4 py-3 pr-10 text-sm text-gray-800 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-no-repeat bg-[right_1rem_center] bg-[length:14px] bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%236b7280%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')]";

const TrasladoForm = () => {
  const [productos, setProductos] = useState([]);
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [usuario, setUsuario] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (productos.length === 0 || !destino) return;
    setEnviando(true);
    try {
      const creador = (usuario || productos[0]?.usuario || "").toLocaleUpperCase();
      await crearTraslado({
        productos,
        origen,
        destino,
        creadoPor: creador,
      });
      setProductos([]);
      setDestino("");
      return navigate("/traslados-pendientes")
    } catch (error) {
      console.error("Hubo un error al hacer el traslado", error);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <div className="max-w-md mx-auto">
        <BotonVolver/>
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
            Gestión de logística
          </p>
          <h1 className="text-3xl font-bold text-gray-900">Nuevo traslado</h1>
        </div>

        <div className="bg-gray-100 rounded-2xl p-5 mb-5">
          <p className="text-sm text-gray-500 leading-relaxed">
            Mueve existencias entre sucursales. Cada registro mantiene la
            integridad de tu inventario.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-sm p-6"
        >
          <div className="mb-5">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
              De tienda
            </label>
            <select
              onChange={(e) => setOrigen(e.target.value)}
              value={origen}
              className={selectClasses}
            >
              <option value="">Seleccionar origen</option>
              {Tiendas.filter((p) => p !== destino).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
              A tienda
            </label>
            <select
              onChange={(e) => setDestino(e.target.value)}
              value={destino}
              className={selectClasses}
            >
              <option value="">Seleccionar destino</option>
              {Tiendas.filter((p) => p !== origen).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <SelectorProductos
            productos={productos}
            setProductos={setProductos}
            usuario={usuario}
            setUsuario={setUsuario}
          />

          <div className="pt-5 mt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
              </svg>
            </div>

            <button
              type="submit"
              disabled={enviando}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              {enviando ? "Enviando..." : "Enviar traslado"}
              {!enviando && <span aria-hidden="true">→</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrasladoForm;