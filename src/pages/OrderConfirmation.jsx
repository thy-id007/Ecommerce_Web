import { Link, Navigate, useLocation } from 'react-router-dom';
import { money } from '../data/products.js';

export default function OrderConfirmation() {
  const { state } = useLocation();
  const order = state?.order;
  if (!order) return <Navigate to="/" replace />;

  return (
    <section className="confirm">
      <div className="success">✔ Order Placed Successfully!</div>
      <div className="panel">
        <div className="row"><strong>Order ID:</strong><span>{order.orderId}</span></div>
        <div className="row">
          <strong>Customer Name:</strong>
          <span>{order.customer.firstName} {order.customer.lastName}</span>
        </div>
        <div className="row">
          <strong>Order Date:</strong>
          <span>{new Date(order.orderDate).toLocaleString()}</span>
        </div>

        <h3>Ordered Products</h3>
        <table className="table">
          <thead>
            <tr><th>Product</th><th>Price</th><th>Qty</th><th>Subtotal</th></tr>
          </thead>
          <tbody>
            {order.items.map((i) => (
              <tr key={i.id}>
                <td>{i.name}</td>
                <td>{money(i.price)}</td>
                <td>{i.qty}</td>
                <td>{money(i.price * i.qty)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="row"><span>Shipping ({order.shippingMethod})</span><span>{money(order.shippingCost)}</span></div>
        <div className="row total"><strong>Total Amount:</strong><span>{money(order.total)}</span></div>
        <div className="row">
          <strong>Order Status:</strong>
          <span className="status">{order.status}</span>
        </div>
      </div>
      <Link to="/" className="btn">Continue Shopping</Link>
    </section>
  );
}
