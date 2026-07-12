import {useState, useEffect} from "react"
import { escucharTraslados } from "../services/trasladosService"

export function useTraslados() {
    const [traslados,setTraslados]=useState([]);
    const [cargando, setCargando]=useState(true);

    useEffect(()=> {

        const unsubscribe = escucharTraslados((data)=>{
            setTraslados(data);
            setCargando(false);
        });
        return ()=> unsubscribe
    }, []);
    return {traslados , cargando}
}  

