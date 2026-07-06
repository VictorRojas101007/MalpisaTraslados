export function parseFechaLocal(dateString) {
  if (!dateString) return null;
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day); // esto SÍ crea la fecha en tu hora local
}