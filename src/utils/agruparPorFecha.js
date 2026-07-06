export function agruparPorFecha(traslados) {
  const grupos = {};

  traslados.forEach((traslado) => {
    if (!traslado.fechaEnvio) return; // por si el timestamp aún no sincronizó

    const fecha = traslado.fechaEnvio.toDate(); // Firestore Timestamp → Date
    const clave = fecha.toLocaleDateString("es-PE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    if (!grupos[clave]) grupos[clave] = [];
    grupos[clave].push(traslado);
  });

  return grupos; // { "5 de julio de 2026": [...], "4 de julio de 2026": [...] }
}