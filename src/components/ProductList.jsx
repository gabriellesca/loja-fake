import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import './ProductList.css'

function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites')
    return saved ? JSON.parse(saved) : []
  })

  const { addToCart } = useCart()

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  const filtered = products.filter(product => {
    const matchSearch = product.title.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'all' || product.category === category
    return matchSearch && matchCategory
  })

  if (loading) return <p>Carregando produtos...</p>

  return (
    <div>
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar produto..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="all">Todas as categorias</option>
          <option value="men's clothing">Roupas masculinas</option>
          <option value="women's clothing">Roupas femininas</option>
          <option value="jewelery">Joias</option>
          <option value="electronics">Eletrônicos</option>
        </select>
      </div>

      <div className="product-grid">
        {filtered.map(product => (
          <div key={product.id} className="product-card">
            <button
              className={`fav-btn ${favorites.includes(product.id) ? 'favorited' : ''}`}
              onClick={() => toggleFavorite(product.id)}
            >
              {favorites.includes(product.id) ? '❤️' : '🤍'}
            </button>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>R$ {product.price}</p>
            <button className="add-btn" onClick={() => addToCart(product)}>
              Adicionar ao carrinho
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList