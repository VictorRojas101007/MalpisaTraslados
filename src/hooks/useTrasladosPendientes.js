import { and, collection, onSnapshot, or, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";

export function useTrasladosPendientes(tiendaId) {
  const [pendientes, setPendientes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!tiendaId) return;

    const q = query(
      collection(db, "traslados"),
      and(
      where("estado", "==", "pendiente"),
      or(
        where("origen", "==", tiendaId),
        where("destino", "==", tiendaId)
      )
    )
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPendientes(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setCargando(false);
    });

    return () => unsubscribe();
  }, [tiendaId]);

  return { pendientes, cargando };
}