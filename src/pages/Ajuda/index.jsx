import "./style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import React, { useState } from "react";
import emailjs from '@emailjs/browser';

function Ajuda() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  function sendEmail(e) {
    e.preventDefault();

    if (name === '' || email === '' || message === '') {
      alert("Preencha todos os campos");
      return;
    }

    const templateParams = {
      from_name: name,
      message: message,
      email: email
    }

    emailjs.send("service_od97lgk", "template_8wi7466", templateParams, "9wOvOMaTj6Bi6wG3M")
      .then((response) => {
        console.log("EMAIL ENVIADO", response.status, response.text)
        setName('')
        setEmail('');
        setMessage('');
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000); // Reset 5 seconds
      }, (err) => {
        console.log("ERRO: ", err)
      });
  }

  return (
    <div>
      <Header />

      <main id="main" className="flexbox-col">
        <h2 className="contact_text">Precisa de Ajuda?</h2>
        <p className="contact_p">Responda ao formulário abaixo</p>
      </main>

      <main className="flexbox-col ajuda">
        
          <div className="container-ajuda">
            <br />
            <br />
            <h1 className="title">Contato</h1>
            <form className="form" onSubmit={sendEmail}>
              <input
                className="input"
                type="text"
                placeholder="Digite seu nome"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <input
                className="input"
                type="text"
                placeholder="Digite seu email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />

              <textarea
                className="textarea"
                placeholder="Digite sua mensagem..."
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
                <br/>
              <input className="ajuda-button" type="submit" value="Enviar" />
            </form>
            {isSubmitted && <p style={{ color: 'green' }}>Mensagem enviada com sucesso! Entraremos em contato em breve.</p>}
          </div>
       
      </main>

      <Footer />
    </div>
  );
}

export default Ajuda;