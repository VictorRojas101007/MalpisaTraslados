import {db} from "../config/firebase"
import {collection, addDoc, serverTimestamp, orderBy, query, onSnapshot, deleteDoc, doc, Timestamp, where, updateDoc} from "firebase/firestore"

export const crearTraslado = async ({origen, productos, destino, creadoPor }) => {
    try {

        await addDoc(collection(db, "traslados"), {
            productos,
            origen,
            destino,
            creadoPor,
            estado : "pendiente",
            fechaEnvio: serverTimestamp(),
            confirmadoPor: null,
            fechaConfirmacion: null
        });
    }catch (error) {
        console.error("Error al crear traslado: ", error);
        throw error;
    }
};


export const escucharTrasladosFiltrados = (filtros, callback, onError) => {
  const condiciones = [
    where("estado", "==", "confirmado"),   
    orderBy("fechaEnvio", "asc"),
  ];


  if (filtros.fechaDesde) {
    condiciones.push(where("fechaEnvio", ">=", Timestamp.fromDate(filtros.fechaDesde)));
  }
  if (filtros.fechaHasta) {
    const finDelDia = new Date(filtros.fechaHasta);
    finDelDia.setHours(23, 59, 59, 999);
    condiciones.push(where("fechaEnvio", "<=", Timestamp.fromDate(finDelDia)));
  }
  if (filtros.tiendaOrigen) {
    condiciones.push(where("origen", "==", filtros.tiendaOrigen));
  }
  if (filtros.tiendaDestino) {
    condiciones.push(where("destino", "==", filtros.tiendaDestino));
  }

  const q = query(collection(db, "traslados"), ...condiciones);

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      callback(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    },
    (error) => {
      console.error("Error en la consulta de traslados:", error);
      if (onError) onError(error);
    }
  );

  return unsubscribe;
};

export const eliminarTraslado = async (trasladoId) => {
  try {
    await deleteDoc(doc(db, "traslados", trasladoId));
  } catch (error) {
    console.error("Error al eliminar traslado:", error);
    throw error;
  }
};

export const confirmarTraslado = async (trasladoId, usuario)=>{

  const ref = doc(db, "traslados", trasladoId)
  await updateDoc( ref, {
    estado:"confirmado",
    confirmadoPor:usuario,
    fechaConfirmacion: serverTimestamp(),
  });
};

export const editarProductosTrasladados = async (trasladoId, cambios) => {
  const ref = doc(db, "traslados", trasladoId)
  await updateDoc( ref, cambios);
}