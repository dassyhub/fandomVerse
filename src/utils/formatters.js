export function formatPrice(value) {
  return `₦${Number(value || 0).toLocaleString()}`;
}

export function slugify(value = "") {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}