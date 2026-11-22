import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { money, shippingMethods } from '../data/products.js';

const emptyForm = { firstName: '', lastName: '', email: '', phone: '', address: '', shipping: '' };

export default function Checkout() {
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  if (cart.length === 0) return <Navigate to="/cart" replace />;

  const shipping = shippingMethods.find((s) => s.id === form.shipping);
  const shippingCost = shipping ? shipping.cost : 0;
  const grandTotal = subtotal + shippingCost;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const validate = () => {
    const err = {};
    if (!form.firstName.trim()) err.firstName = 'First name is required';
    if (!form.lastName.trim()) err.lastName = 'Last name is required';
    if (!form.email.trim()) err.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Email is invalid';
    if (!form.phone.trim()) err.phone = 'Phone number is required';
    else if (!/^[0-9+\-\s]{8,15}$/.test(form.phone)) err.phone = 'Phone number is invalid';
    if (!form.address.trim()) err.address = 'Address is required';
    if (!form.shipping) err.shipping = 'Please choose a shipping method';
    return err;
  };

  const placeOrder = (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length) return setErrors(err);

    // Generate Order ID: ORD-0001, ORD-0002, ...
    const next = (parseInt(localStorage.getItem('orderCounter')) || 0) + 1;
    localStorage.setItem('orderCounter', next);

    const order = {
      orderId: `ORD-${String(next).padStart(4, '0')}`,
      customer: {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
      },
      shippingMethod: shipping.label,
      shippingCost,
      items: cart,
      subtotal,
      total: grandTotal,
      orderDate: new Date().toISOString(),
      status: 'Pending',
    };

    // Store customer/order data
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([...orders, order]));

    clearCart();
    navigate('/order-confirmation', { state: { order } });
  };

  const field = (name, label, type = 'text') => (
    <div className="field">
      <label htmlFor={name}>{label} <span className="req">*</span></label>
      {type === 'textarea' ? (
        <textarea id={name} name={name} value={form[name]} onChange={handleChange} rows={3} />
      ) : (
        <input id={name} name={name} type={type} value={form[name]} onChange={handleChange} />
      )}
      {errors[name] && <small className="error">{errors[name]}</small>}
    </div>
  );

  return (
    <section>
      <h1>Checkout</h1>
      <form className="checkout" onSubmit={placeOrder} noValidate>
        <div className="panel">
          <h2>Customer Information</h2>
          <div className="two">
            {field('firstName', 'First Name')}
            {field('lastName', 'Last Name')}
          </div>
          {field('email', 'Email', 'email')}
          {field('phone', 'Phone Number', 'tel')}
          {field('address', 'Address', 'textarea')}

          <h2>Shipping Method</h2>
          {shippingMethods.map((s) => (
            <label key={s.id} className="radio">
              <input
                type="radio"
                name="shipping"
                value={s.id}
                checked={form.shipping === s.id}
                onChange={handleChange}
              />
              {s.label} — {s.cost === 0 ? 'Free' : money(s.cost)}
            </label>
          ))}
          {errors.shipping && <small className="error">{errors.shipping}</small>}
        </div>

        <div className="panel">
          <h2>Order Summary</h2>
          {cart.map((i) => (
            <div className="row" key={i.id}>
              <span>{i.name} × {i.qty}</span>
              <span>{money(i.price * i.qty)}</span>
            </div>
          ))}
          <hr />
          <div className="row"><span>Subtotal</span><span>{money(subtotal)}</span></div>
          <div className="row"><span>Shipping</span><span>{money(shippingCost)}</span></div>
          <div className="row total"><span>Grand Total</span><span>{money(grandTotal)}</span></div>
          <button type="submit" className="btn full">Place Order</button>
        </div>
      </form>
    </section>
  );
}
