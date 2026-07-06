
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function RutaPrivada(){
    const {usuario, cargando} = useAuth();

    if (cargando) {
        return <p>... cargando</p>
    }
    if (!usuario) {
         return <Navigate to="/login" replace />; 
    }
    return <Outlet/>
}
export default RutaPrivada;