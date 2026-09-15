// Base URLs for the three backend services.
// Override these via environment variables at build time (see .env.example).
export const USER_SERVICE_URL =
  process.env.REACT_APP_USER_SERVICE_URL || "http://localhost:8081";
export const PRODUCT_SERVICE_URL =
  process.env.REACT_APP_PRODUCT_SERVICE_URL || "http://localhost:8082";
export const ORDER_SERVICE_URL =
  process.env.REACT_APP_ORDER_SERVICE_URL || "http://localhost:8083";

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface Order {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
}

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request to ${url} failed with status ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export function fetchUsers(): Promise<User[]> {
  return getJson<User[]>(`${USER_SERVICE_URL}/users`);
}

export function fetchProducts(): Promise<Product[]> {
  return getJson<Product[]>(`${PRODUCT_SERVICE_URL}/products`);
}

export function fetchOrders(): Promise<Order[]> {
  return getJson<Order[]>(`${ORDER_SERVICE_URL}/orders`);
}
