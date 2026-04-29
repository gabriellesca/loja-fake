import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { login, register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (isLogin) {
      const ok = login(email, password)
      if (ok) navigate('/')
      else setError('Email ou senha incorretos!')
    } else {
      const ok = register(name, email, password)
      if (ok) navigate('/')
      else setError('Email já cadastrado!')
    }
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>{isLogin ? 'Entrar' : 'Criar conta'}</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>

        <p className="toggle">
          {isLogin ? 'Não tem conta?' : 'Já tem conta?'}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? ' Cadastre-se' : ' Entrar'}
          </span>
        </p>
      </div>
    </div>
  )
}

export default LoginPage