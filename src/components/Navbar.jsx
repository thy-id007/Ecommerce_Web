import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Navbar() {
  const { itemCount } = useCart();
  return (
    <header className="navbar">
      <Link to="/" className="brand">🛒 Simple Shop</Link>
      <nav>
        <NavLink to="/" end>Products</NavLink>
        <NavLink to="/cart">
          Cart <span className="badge">{itemCount}</span>
        </NavLink>
      </nav>
    </header>
  );
}
