import "./style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/authContext";
import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { doSignOut } from "../../services/auth";

function Conta() {
  const navigate = useNavigate()
  const {currentUser, userLoggedIn} = useAuth() 
  return (
      <div>
        <Header/>

        
        <main id="main" class="flexbox-col">
          <h2>Sua Conta</h2>
          <p>{currentUser.displayName ? currentUser.displayName : currentUser.email} voce está logado</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum corporis, rerum doloremque iste sed voluptates omnis molestias molestiae animi recusandae labore sit amet delectus ad necessitatibus laudantium qui! Magni quisquam illum quaerat necessitatibus sint quibusdam perferendis! Aut ipsam cumque deleniti error perspiciatis iusto accusamus consequuntur assumenda. Obcaecati minima sed natus?</p>
          {
          userLoggedIn
          ?
          <>
        <button className="button-cadastro" onClick={()=>{doSignOut().then(() =>{navigate('/signin')})}}>Logout</button>
          </>
          :
        <Link to='/signin'>login</Link>
          
        }
        </main>        
        <Footer/>
      </div>
  );
}

export default Conta;