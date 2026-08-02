const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api";

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
    get: (slug) => request(`/learn/${slug}/`),
  },
  pages: {
    get: (slug) => request(`/pages/${slug}/`),
  },
  disclaimers: {
    list: () => request(`/disclaimers/`),
  },
  orders: {
    create: (payload) =>
      request(`/orders/`, { method: "POST", body: JSON.stringify(payload) }),
    lookup: (orderNumber, email) =>
      request(
        `/orders/lookup/?order_number=${encodeURIComponent(orderNumber)}&email=${encodeURIComponent(email)}`
      ),
  },
};

export function generateOrderNumber() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ZC-${stamp}${rand}`;
}
