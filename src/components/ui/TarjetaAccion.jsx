// components/ui/TarjetaAccion.jsx
function TarjetaAccion({ imagen, titulo, descripcion, onClick, textoBoton, destacada = false }) {
  return (
    <div className="relative bg-white rounded-3xl shadow-sm p-6 overflow-hidden h-full flex flex-col">
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
          destacada ? "bg-blue-600" : "bg-blue-50"
        }`}
      >
        <img
          src={imagen}
          alt=""
          className={`w-7 h-7 ${destacada ? "" : "opacity-70"}`}
        />
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">{titulo}</h3>
      <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">{descripcion}</p>

      <button
        type="button"
        onClick={onClick}
        className="text-blue-600 text-xs font-bold uppercase tracking-wide flex items-center gap-1 hover:underline self-start"
      >
        {textoBoton} <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}

export default TarjetaAccion;