import { useCart } from '../context/CartContext'
import './CartPage.css'

function CartPage() {
  const { cart, removeFromCart, total } = useCart()

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Seu carrinho está vazio 🛒</h2>
        <a href="/">Voltar para a loja</a>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <h2>Meu Carrinho 🛒</h2>
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} />
            <div className="cart-item-info">
              <h3>{item.title}</h3>
              <p>Quantidade: {item.qty}</p>
              <p>R$ {(item.price * item.qty).toFixed(2)}</p>
            </div>
            <button onClick={() => removeFromCart(item.id)}>🗑️</button>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <strong>Total: R$ {total.toFixed(2)}</strong>
        <button className="checkout-btn">Finalizar compra</button>
      </div>
    </div>
  )
}

export default CartPage