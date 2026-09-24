const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://natrulir-backend.onrender.com/api';

export const fetchProducts = async (params = {}) => {
  try {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'All') query.append('category', params.category);
    if (params.search) query.append('search', params.search);
    if (params.badge && params.badge !== 'All') query.append('badge', params.badge);
    if (params.featured) query.append('featured', 'true');
    if (params.sort) query.append('sort', params.sort);

    const res = await fetch(`${API_BASE_URL}/products?${query.toString()}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.error('API Error fetchProducts:', err);
    return [];
  }
};

export const fetchProductById = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error('API Error fetchProductById:', err);
    return null;
  }
};

export const createOrder = async (orderPayload) => {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderPayload)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Failed to place order' }));
    throw new Error(errorData.message || 'Failed to place order');
  }
  return await res.json();
};

export const getOrderDetails = async (orderIdOrNumber) => {
  const res = await fetch(`${API_BASE_URL}/orders/${orderIdOrNumber}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Order not found' }));
    throw new Error(err.message || 'Order not found');
  }
  return await res.json();
};
