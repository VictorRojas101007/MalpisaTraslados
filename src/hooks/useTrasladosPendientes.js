// hooks/useTrasladosPendientes.js
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, query, where, and, or, onSnapshot } from "firebase/firestore";

export function useTrasladosPendientes(usuario) {
  const [pendientes, setPendientes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Esperar a que el perfil de Firestore ya esté cargado (rol y tiendaId definidos)
    if (!usuario || (usuario.rol !== "admin" && !usuario.tiendaId)) {
      return;
    }

    const esAdmin = usuario.rol === "admin";

    const q = esAdmin
      ? query(collection(db, "traslados"), where("estado", "==", "pendiente"))
      : query(
          collection(db, "traslados"),
          and(
            where("estado", "==", "pendiente"),
            or(
              where("origen", "==", usuario.tiendaId),
              where("destino", "==", usuario.tiendaId)
            )
          )
        );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPendientes(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setCargando(false);
    });

    return () => unsubscribe();
  }, [usuario]);

  return { pendientes, cargando };
}