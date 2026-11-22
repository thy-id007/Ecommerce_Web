import { useState } from 'react';
import { products, money } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';

export default function Products() {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(null);

  const handleAdd = (p) => {
    addToCart(p);
    setAdded(p.name);
    setTimeout(() => setAdded(null), 1500);
  };

  return (
    <section>
      <h1>Products</h1>
      {added && <div className="toast">✔ {added} added to cart</div>}
      <div className="grid">
        {products.map((p) => (
          <div className="card" key={p.id}>
            <div className="icon">{p.icon}</div>
            <h3>{p.name}</h3>
            <p className="price">{money(p.price)}</p>
            <button className="btn" onClick={() => handleAdd(p)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
}
