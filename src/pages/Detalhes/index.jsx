import React, { useEffect, useContext } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./style.css";
import { useParams } from 'react-router-dom';
import AppContext from "../../contexts/AppContext";
import { db } from '../../services/firebaseConnection';
import {
    collection,
    onSnapshot
  } from 'firebase/firestore';


function Detalhes() {
  const { id } = useParams();
  //context para armazenar clientes
  const { clientes, setClientes} = useContext(AppContext);
  const [cliente, setCliente] = React.useState(null);

  // Efeito que carrega os clientes do Firestore sempre que o componente é montado.
  useEffect(() => {
    async function loadClientes(){
    const unsub = onSnapshot(collection(db, "clientes-di"), (snapshot) => {
    let listaClientes = [];
    snapshot.forEach((doc) => {
      listaClientes.push({
        id: doc.id,
        nome: doc.data().nome,
        propriedade: doc.data().propriedade, 
        email: doc.data().email,
        telefone: doc.data().telefone,
        cpf: doc.data().cpf,
        quantAnimais: doc.data().quantAnimais,   
        quantRacaoMes: doc.data().quantRacaoMes,   
    })
    })
    setClientes(listaClientes);
    setCliente(listaClientes.find(cliente => cliente.id === id));
    })
    }
    loadClientes();
  }, [id])

  if (!cliente) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <Header/>
    <main id="main" class="flexbox-col">
      <article className="container-cadastro">
        <div className="saiba">
        <strong>Nome: {cliente.nome}</strong>
        <p >Propriedade: {cliente.propriedade}</p>
        <p >CPF/CNPJ: {cliente.cpf}</p>
        <p >E-mail: {cliente.email}</p>
        <p >Telefone: {cliente.telefone}</p>
        <p >Quant.Animais: {cliente.quantAnimais}</p>
        <p >Quant. de Ração: {cliente.quantRacaoMes}</p>
        </div>
      </article>
    </main>
    <Footer/>
    </div>
  );
}

export default Detalhes;