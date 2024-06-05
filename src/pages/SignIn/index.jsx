// index.jsx
import { useState, useContext } from 'react';
import './style.css';

import logo from '../../assets/logoAgrariaN.png';
import { Navigate, Link } from 'react-router-dom';

import foto1 from '../../assets/gadodecorte.jpg';

import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../services/auth';
import { useAuth } from '../../contexts/authContext/index';

export default function SignIn(){
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (e) =>{
    e.preventDefault();
    if(!isSigningIn){
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (error) {
        setIsSigningIn(false);
        setErrorMessage("Credenciais inválidas. Por favor, verifique seu e-mail e senha.");
      }
    }
  }

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    if(!isSigningIn){
      setIsSigningIn(true);
      try {
        await doSignInWithGoogle();
      } catch (error) {
        setIsSigningIn(false);
        setErrorMessage("Ocorreu um erro ao fazer login com o Google. Por favor, tente novamente mais tarde.");
      }
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

          <form onSubmit ={onSubmit}>
            <h1>Entrar</h1>
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
              {isSigningIn ? "Carregando..." : "Acessar"}
            </button>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <Link className='login-a' to="/signup">Criar uma conta</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
