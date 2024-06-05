import { useState, useContext  } from 'react'
import logo from '../../assets/logoAgrariaN.png';
import foto1 from '../../assets/gadodecorte.jpg'
import { Navigate, Link, useNavigate } from 'react-router-dom'

import { doCreateUserWithEmailAndPassword } from '../../services/auth'
import { useAuth } from '../../contexts/authContext'

export default function SignUp(){
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate() 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = async (e) =>{
    e.preventDefault();
    if(!isRegistering){
      setIsRegistering(true)
      await doCreateUserWithEmailAndPassword(email, password)
    }
  }
  

  return(
    <div className="container-center">
      {userLoggedIn && (<Navigate to={'/'} replace={true}/>)}
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo do sistema" />
          <h1 className='portal'>Portal do Cooperado</h1>
        </div>

        <div className='login-div'>
        <img className='login-img' src={foto1} alt="imagem de fundo login"/>

        <form onSubmit={onSubmit}>
          <h1>Nova conta</h1>

          <input 
            type="text" 
            placeholder="email@email.com"
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
          />

          <input 
            type="password" 
            placeholder="********"
            value={password}
            onChange={ (e) => setPassword(e.target.value) }
          />

          <button type="submit">
            {isRegistering ? 'Carregando...' : 'Cadastrar'}
          </button>
          <Link  className="login-a" to="/signin">Já possui uma conta? Faça login</Link>
        </form>
        </div>

      </div>
    </div>
  )
}