
import './style.css';


function Footer(){ 

  return(
    <footer>
        <div className="interface">
            <div className="line-footer">
                <div className="flex">
                    <nav className='bemvindo'>
                        <ul>
                            <li>Bem-vindo ao site!</li>
                            <li>Controle de estoque de Ração para seus clientes!</li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="line-footer borda">
                <p><i className="bi bi-envelope-fill"></i> <a
                        href="https://www.agraria.com.br/">Site agraria</a>
                </p>
            </div>
            <div className="btn-social">
                        <a href="https://www.instagram.com/agrariafarinhas/"><button><i className="bi bi-instagram"></i></button></a>
                        <a href="https://wa.me/554236258035"><button><i className="bi bi-whatsapp"></i></button></a>
                        <a href="https://www.facebook.com/AgrariaFarinhas"><button><i className="bi bi-facebook"></i></button></a>
            </div>
        </div>
    </footer> 

  );
}

export default Footer;