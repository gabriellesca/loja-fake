import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import './Header.css'

function Header() {
  const { cart } = useCart()
  const { user, logout } = useAuth()
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0)

  return (
    <header>
      <h1>🛍️ Loja Fake</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="#">Favoritos ❤️</Link>
        <Link to="/carrinho">
          Carrinho 🛒 {totalItems > 0 && <span className="badge">{totalItems}</span>}
        </Link>
        {user ? (
          <>
            <span>Olá, {user.name}!</span>
            <span className="logout" onClick={logout}>Sair</span>
          </>
        ) : (
          <Link to="/login">Entrar</Link>
        )}
      </nav>
    </header>
  )
}

export default Header