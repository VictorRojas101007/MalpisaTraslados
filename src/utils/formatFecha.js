export default function formatFecha(timestamp) {
  if (!timestamp) return "—";
  if (typeof timestamp.toDate === "function") {
    const d = timestamp.toDate();
    return d.toLocaleString();
  }
  const d = timestamp instanceof Date ? timestamp : new Date(timestamp);
  if (isNaN(d)) return "—";
  return d.toLocaleString();
}