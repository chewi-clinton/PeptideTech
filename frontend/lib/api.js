// Server-side (RSC/route handlers, running inside the frontend container)
// must reach the backend over the Docker network; the browser must reach it
// via the host-mapped port. API_URL_INTERNAL covers the former, falling back
// to the public URL for plain `npm run dev` (no Docker network involved).
const API_URL =
  typeof window === "undefined"
    ? process.env.API_URL_INTERNAL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api"
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API ${res.status} ${path}: ${body}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  products: {
    list: (params = "") => request(`/products/${params}`),
    get: (slug) => request(`/products/${slug}/`),
  },
  categories: {
    list: () => request(`/categories/`),
    get: (slug) => request(`/categories/${slug}/`),
  },
  blog: {
    list: () => request(`/blog/`),
    get: (slug) => request(`/blog/${slug}/`),
  },
  learn: {
    list: () => request(`/learn/`),
    get: (slug) => request(`/learn/${slug}/`),
  },
  pages: {
    list: () => request(`/pages/`),
    get: (slug) => request(`/pages/${slug}/`),
  },
  disclaimers: {
    list: () => request(`/disclaimers/`),
  },
  coaLibrary: {
    list: () => request(`/coa-library/`),
  },
  orders: {
    create: (payload) =>
      request(`/orders/`, { method: "POST", body: JSON.stringify(payload) }),
    lookup: (orderNumber, email) =>
      request(
        `/orders/lookup/?order_number=${encodeURIComponent(orderNumber)}&email=${encodeURIComponent(email)}`
      ),
    list: (token) => request(`/orders/`, { headers: authHeader(token) }),
    get: (id, token) => request(`/orders/${id}/`, { headers: authHeader(token) }),
    updateStatus: (id, status, token) =>
      request(`/orders/${id}/`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
        headers: authHeader(token),
      }),
  },
  auth: {
    login: (username, password) =>
      request(`/auth/token/`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
      }),
  },
  adminProducts: {
    list: (token) => request(`/admin/products/`, { headers: authHeader(token) }),
    get: (id, token) => request(`/admin/products/${id}/`, { headers: authHeader(token) }),
    create: (payload, token) =>
      request(`/admin/products/`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: authHeader(token),
      }),
    update: (id, payload, token) =>
      request(`/admin/products/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: authHeader(token),
      }),
    remove: (id, token) =>
      request(`/admin/products/${id}/`, { method: "DELETE", headers: authHeader(token) }),
    uploadImage: async (id, file, token, { isPrimary = false } = {}) => {
      const form = new FormData();
      form.append("image", file);
      form.append("is_primary", isPrimary ? "true" : "false");
      const res = await fetch(`${API_URL}/admin/products/${id}/images/`, {
        method: "POST",
        body: form,
        headers: authHeader(token),
      });
      if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
      return res.json();
    },
    deleteImage: (id, imageId, token) =>
      request(`/admin/products/${id}/images/${imageId}/`, {
        method: "DELETE",
        headers: authHeader(token),
      }),
  },
};

function authHeader(token) {
  return token ? { Authorization: `Token ${token}` } : {};
}

export function generateOrderNumber() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `PT-${stamp}${rand}`;
}
