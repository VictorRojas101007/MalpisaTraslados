
import { useEffect, useState } from "react";
import { escucharTrasladosFiltrados } from "../services/trasladosService";

function rangoPorDefecto() {
  const ayer = new Date();
  ayer.setDate(ayer.getDate() - 1);
  ayer.setHours(0, 0, 0, 0);

  const hoy = new Date();

  return { fechaDesde: ayer, fechaHasta: hoy, tiendaOrigen: null, tiendaDestino: null };
}



export function useTrasladosFiltrados() {
  const [filtros, setFiltros] = useState(rangoPorDefecto());
  const [traslados, setTraslados] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCargando(true);
    const unsubscribe = escucharTrasladosFiltrados(filtros, (data) => {
      setTraslados(data);
      setCargando(false);
    });
    return () => unsubscribe();
  }, [filtros]);

  return { traslados, cargando, filtros, setFiltros };
}