export function formatINR(value) {
  const n = Number(value || 0);
  return `₹${n.toLocaleString("en-IN")}`;
}

export function getFullAddress(item) {
  const street = (item?.address?.street || item?.street || "").trim();
  const city = (item?.address?.city || item?.city || "").trim();
  const pin = String(item?.address?.pin || item?.pin || "").trim();
  const line = [street, city].filter(Boolean).join(", ");
  return line + (pin ? ` - ${pin}` : "");
}

export function daysBetween(from, to) {
  const start = new Date(from);
  const end = new Date(to);
  const ms = end - start;
  if (!Number.isFinite(ms)) return 0;
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}