export const products = [
  { id: 1, name: 'Laptop', price: 650, icon: '💻' },
  { id: 2, name: 'Mouse', price: 15, icon: '🖱️' },
  { id: 3, name: 'Keyboard', price: 25, icon: '⌨️' },
  { id: 4, name: 'Monitor', price: 120, icon: '🖥️' },
];

export const shippingMethods = [
  { id: 'standard', label: 'Standard Delivery (3-5 days)', cost: 5 },
  { id: 'express', label: 'Express Delivery (1-2 days)', cost: 15 },
  { id: 'pickup', label: 'Store Pickup', cost: 0 },
];

export const money = (n) => `$${n.toFixed(2)}`;
