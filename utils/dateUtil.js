export function formatDate(date, format = "url") {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return format === "ui"
    ? `${day}/${month}/${year}`
    : `${year}-${month}-${day}`;
}
