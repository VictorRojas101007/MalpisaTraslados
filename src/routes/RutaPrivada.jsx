
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Cargando from "../components/ui/Cargando";

function RutaPrivada(){
    const {usuario, cargando} = useAuth();

    if (cargando) {
        return <Cargando mensaje="Verificando sesión..." />;
    }
    if (!usuario) {
         return <Navigate to="/login" replace />; 
    }
    return <Outlet/>
}
export default RutaPrivada;