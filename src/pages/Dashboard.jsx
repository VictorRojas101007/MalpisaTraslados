// pages/Dashboard.jsx
import { useNavigate } from "react-router-dom";
import TarjetaAccion from "../components/ui/TarjetaAccion";
import HistorialTrasladoImg from "../assets/historialTrasladoImg.svg";
import trasladoImg from "../assets/trasladoImg.svg";
import pendienteImg from "../assets/pendiente.svg";
import { cerrarSesion } from "../services/usuariosService";
import { useTrasladosPendientes } from "../hooks/useTrasladosPendientes";
import { useAuth } from "../hooks/useAuth";

function Dashboard() {
    const { usuario } = useAuth();

    const { pendientes } = useTrasladosPendientes(usuario?.tiendaId);
  
    const handleLogout = async () => {
    await cerrarSesion();
    navigate("/login");
  };


  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-8 md:px-12 md:py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
            Sistema de gestión
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Traslado de productos
          </h1>
          <div className="w-12 h-1 bg-blue-600 rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <TarjetaAccion
            imagen={trasladoImg}
            titulo="Traslado"
            descripcion="Inicia una nueva transferencia de productos entre almacenes de forma inmediata."
            textoBoton="Comenzar traslado"
            onClick={() => navigate("/")}
            destacada
          />

          <TarjetaAccion
            imagen={HistorialTrasladoImg}
            titulo="Historial de Traslados"
            descripcion="Consulta el registro detallado de todas las operaciones y movimientos realizados."
            textoBoton="Ver registros"
            onClick={() => navigate("/historial-traslados")}
          />

          <TarjetaAccion
            imagen={pendienteImg}
            titulo="Traslados por confirmar"
            descripcion={`Tienes ${pendientes.length} traslados pendientes por confirmar`}
            textoBoton="Ver traslados pendientes"
            onClick={() => navigate("/traslados-pendientes")}
          />
        </div>
        <button onClick={handleLogout}>Cerrar sesion</button>
      </div>
    </div>
  );
}

export default Dashboard;