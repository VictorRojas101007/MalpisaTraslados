// components/ui/Cargando.jsx
function Cargando({ mensaje = "Cargando..." }) {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4 py-12">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-gray-100" />
        <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
      </div>
      <p className="text-sm font-medium text-gray-400">{mensaje}</p>
    </div>
  );
}

export default Cargando;