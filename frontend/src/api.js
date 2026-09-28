const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export async function api(path, options = {}) {
  const token = localStorage.getItem("gestnutri_token");
  const response = await fetch(`${API_URL}${path}`, { ...options, headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Token ${token}` } : {}), ...options.headers } });
  if (!response.ok) throw new Error((await response.json().catch(() => ({}))).detail || "No fue posible completar la solicitud.");
  return response.status === 204 ? null : response.json();
}
