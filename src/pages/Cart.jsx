import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { money } from '../data/products.js';

export default function Cart() {
  const { cart, updateQty, removeItem, subtotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <section className="empty">
        <h1>Shopping Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/" className="btn">Continue Shopping</Link>
      </section>
    );
  }

  return (
    <section>
      <h1>Shopping Cart</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.icon} {item.name}</td>
              <td>{money(item.price)}</td>
              <td>
                <div className="qty">
                  <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) => updateQty(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                  />
                  <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                </div>
              </td>
              <td>{money(item.price * item.qty)}</td>
              <td>
                <button className="btn danger small" onClick={() => removeItem(item.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="summary">
        <div className="row"><span>Subtotal</span><span>{money(subtotal)}</span></div>
        <div className="row total"><span>Grand Total</span><span>{money(subtotal)}</span></div>
        <button className="btn full" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
      </div>
    </section>
  );
}
