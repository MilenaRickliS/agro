import "./style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import React from "react";

function Ajuda() { 
  return (
      <div>
        <Header/>

        
        <main id="main" class="flexbox-col">
          <h2>Precisa de Ajuda?</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum corporis, rerum doloremque iste sed voluptates omnis molestias molestiae animi recusandae labore sit amet delectus ad necessitatibus laudantium qui! Magni quisquam illum quaerat necessitatibus sint quibusdam perferendis! Aut ipsam cumque deleniti error perspiciatis iusto accusamus consequuntur assumenda. Obcaecati minima sed natus?</p>

        </main>        
        
        <Footer/>
      </div>
  );
}

export default Ajuda;