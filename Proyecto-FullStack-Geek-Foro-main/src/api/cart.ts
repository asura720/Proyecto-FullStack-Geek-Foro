export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const CART_STORAGE_KEY = 'geekplay_cart';

export function getCart(): CartItem[] {
  const cart = localStorage.getItem(CART_STORAGE_KEY);
  return cart ? JSON.parse(cart) : [];
}

export function saveCart(cart: CartItem[]): void {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event('storage'));
}

export function addToCart(item: Omit<CartItem, 'quantity'>, quantity: number = 1): void {
  const cart = getCart();
  const existingIndex = cart.findIndex(i => i.id === item.id);

  if (existingIndex >= 0) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({ ...item, quantity });
  }

  saveCart(cart);
}

export function removeFromCart(id: string): void {
  const cart = getCart();
  const filtered = cart.filter(item => item.id !== id);
  saveCart(filtered);
}

export function updateCartItemQuantity(id: string, quantity: number): void {
  const cart = getCart();
  const item = cart.find(i => i.id === id);

  if (item) {
    item.quantity = quantity;
    saveCart(cart);
  }
}

export function clearCart(): void {
  saveCart([]);
}

export function getCartTotal(): number {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

export function getCartItemCount(): number {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}
