import "./style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AppContext from "../../contexts/AppContext";
import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import { db } from '../../services/firebaseConnection';
import {
  doc,
  updateDoc, 
  collection,
    onSnapshot
} from 'firebase/firestore';
import { useParams } from 'react-router-dom';

function EditarCliente() { 
    const { id } = useParams();
  //context para armazenar a quantidade de ração dos clientes
  const { quantRacaoMes, setQuantRacaoMes, clientes, setClientes} = useContext(AppContext);
  const [cliente, setCliente] = React.useState(null);
  // Estado para armazenar o nome.
  const [nome, setNome] = useState('');
  // Estado para armazenar o nome da propriedade.
  const [propriedade, setPropriedade] = useState('');
  // Estado para armazenar o ID da cliente a ser editado ou excluído.
  const [idCliente, setIdCliente] = useState('');
  // Estado para armazenar o email do cliente.
  const [emailCliente, setEmailCliente] = useState('');
  // Estado para armazenar o telefone do cliente.
  const [telefone, setTelefone] = useState('');
  // Estado para armazenar o cpf do cliente.
  const [cpf, setCpf] = useState('');
  // Estado para armazenar quantidade de cabeça de gado.
  const [quantAnimais, setQuantAnimais] = useState('');

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
  
  // Função para editar um cliente existente no Firestore.
async function editarCliente() {
  const docRef = doc(db, "clientes-di", id);
  await updateDoc(docRef, {
    nome: nome,
    propriedade: propriedade,
    email: emailCliente,
    telefone: telefone,
    cpf: cpf,
    quantAnimais: parseInt(quantAnimais),
    quantRacaoMes: parseInt(quantRacaoMes),
  })
  .then(() => {
    console.log("CLIENTE ATUALIZADO!");
    setNome('');
    setPropriedade('');
    setEmailCliente('');
    setTelefone('');
    setCpf('');
    setQuantAnimais('');
    setQuantRacaoMes('');
  })
  .catch((error) => {
    console.log(error);
  });
}


  return (
      <div>
        <div><Header/></div>
        <main id="main" className="flexbox-col">
          
          <h2>Editar Clientes</h2>
          <p>Coloque aqui os novos dados do cliente!</p>
          <br></br>
      
      <div className="container-cadastro">
        <Link className="voltar" to="/cadastro"> Voltar </Link> <br/><br/>
        <label>ID:</label>
        <input 
          disabled 
          className="form-cadastro"
        placeholder={id}
        value={id}
        onChange={ (e) => setIdCliente(e.target.value) }
        /> 
        <label>Nome:</label>
        <input className="form-cadastro"
        placeholder='Digite o nome completo'
        value={nome}
        onChange={ (e) => setNome(e.target.value) }
        /> <br/>
        <label>Propriedade:</label>
        <input className="form-cadastro"
        type="text"
        placeholder='Digite o nome de propriedade'
        value={propriedade}
        onChange={ (e) => setPropriedade(e.target.value) }
        />
        <label>CPF/CNPJ:</label>
        <input className="form-cadastro"
        type="text"
        placeholder='Digite o CPF ou CNPJ'
        value={cpf}
        onChange={ (e) => setCpf(e.target.value) }
        /><br/>
        <label>Email:</label>
        <input className="form-cadastro"
        type="text"
        placeholder="Digite o email do cliente"
        value={emailCliente}
        onChange={(e) => setEmailCliente(e.target.value) }
        />
        <label>Telefone:</label>
        <input className="form-cadastro"
        type="text"
        placeholder="Digite o telefone do cliente"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value) }
        /><br/>
        <label>Quantidade de animais(gado de corte):</label>
        <input className="form-cadastro"
        type="number"
        placeholder="Digite a quantidade que possui de animais"
        value={quantAnimais}
        onChange={(e) => setQuantAnimais(e.target.value) }
        /><br/>

        <label>Quantidade de ração por mês:</label>
        <input className="form-cadastro"
        type="number"
        placeholder="Digite a quantidade de ração por mês"
        value={quantRacaoMes}
        onChange={(e) => setQuantRacaoMes(e.target.value) }
        />

        <div>
          <button className="button-cadastro" onClick={editarCliente}>Editar Cliente</button>
          
        </div>

      </div>
      
          
        </main> 
        <Footer/>
      </div>
  );
}

export default EditarCliente;