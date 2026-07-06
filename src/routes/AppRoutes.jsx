import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import HistorialTraslados from "../pages/HistorialTraslados";
import RutaPrivada from "./RutaPrivada";
import AltaEmpleado from "../pages/AltaEmpleados";
import Dashboard from "../pages/Dashboard";
import TrasladoForm from "../components/traslados/TrasladoForm";
import TrasladosPendientes from "../pages/TrasladosPendientes";

function AppRoutes () {
    return(


        <Routes>

            <Route 
            path="/login" 
            element={<Login/>}
            />
            
            <Route element={<RutaPrivada/>}>
                <Route 
                    path="/register"
                    element={<AltaEmpleado/>}
                />
                <Route 
                    path="/"
                    element={<Dashboard/>}
                />
                <Route 
                    path="/traslado"
                    element={<TrasladoForm/>}
                />
                <Route 
                    path="/traslados-pendientes"
                    element={<TrasladosPendientes/>}
                />

                <Route 
                path="/historial-traslados" 
                element={
                <HistorialTraslados/>
                }
            />
            </Route>


        </Routes>

    )
}
export default AppRoutes;