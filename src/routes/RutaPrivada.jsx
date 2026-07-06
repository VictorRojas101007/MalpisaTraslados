
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function RutaPrivada(){
    const {usuario, cargando} = useAuth();

    if (cargando) {
        return <p>... cargando</p>
    }
    if (!usuario) {
        Navigate("/login")
    }
    return <Outlet/>
}
export default RutaPrivada;