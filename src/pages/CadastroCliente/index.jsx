import Fuse from "fuse.js";
import "./style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import AppContext from "../../contexts/AppContext";
import { useState, useEffect, useContext, useRef } from 'react';
import { db } from '../../services/firebaseConnection';
import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';

function CadastroCliente() { 

  const fuse = useRef(null);
  const [filteredClientes, setFilteredClientes] = useState([]);
  //context para armazenar a quantidade de ração dos clientes
  const { quantRacaoMes, setQuantRacaoMes, clientes, setClientes} = useContext(AppContext);
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
        quantAnimais: doc.quantAnimais,   
        quantRacaoMes: doc.data().quantRacaoMes,   
    })
    })
    setClientes(listaClientes);
    setFilteredClientes(listaClientes);
    })
    }
    loadClientes();
  }, [])

  // Função para adicionar um novo cliente ao Firestore.
  async function handleAdd(){
    await addDoc(collection(db, "clientes-di"), {
      nome: nome,
      propriedade: propriedade,
      email: emailCliente,
      telefone: telefone,
      cpf: cpf,
      quantAnimais: quantAnimais,
      quantRacaoMes: quantRacaoMes,
    })
    .then(() => {
      console.log("CADASTRADO COM SUCESSO")
      setNome('');
      setPropriedade('');
      setEmailCliente('');
      setTelefone('');
      setCpf('');
      setQuantAnimais('');
      setQuantRacaoMes('');
      
    })
    .catch((error) => {
      console.log("ERRO " + error);
    })
  }  

  // Função para excluir um cliente do Firestore.
  async function excluirCliente(id){
    const docRef = doc(db, "clientes-di", id);
    await deleteDoc(docRef)
  .then(() =>{
    alert("CLIENTE DELETADO COM SUCESSO!");
  })
  }

  const [searchQuery, setSearchQuery] = useState('');

  // const handleSearch = (event) => {
  //   const query = event.target.value.toLowerCase();
  //   setSearchQuery(query);
  //   const filtered = clientes.filter((cliente) => {
  //     return (
  //       cliente.nome.toLowerCase().includes(query) ||
  //       cliente.propriedade.toLowerCase().includes(query)
  //     );
  //   });
  //   setFilteredClientes(filtered);
  // };

useEffect(() => {
  if (clientes.length > 0) {
    fuse.current = new Fuse(clientes, {
      keys: ['nome', 'propriedade'],
      threshold: 0.3,
    });
    setFilteredClientes(clientes); 
  }
}, [clientes]);
const handleSearch = (event) => {
  const query = event.target.value.toLowerCase();
  setSearchQuery(query);
  if (query.length === 0) {
    setFilteredClientes(clientes); 
  } else {
    const results = fuse.current.search(query);
    setFilteredClientes(results.map(result => result.item));
  }
};

  return (
      <div>
        <div><Header/></div>
        <main id="main" className="flexbox-col">
          <h2>Clientes</h2>
          <p>Cadastre um novo cliente aqui!</p>
          <br></br>
      
      <div className="container-cadastro"> 
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
          <button className="button-cadastro" onClick={handleAdd}>Adicionar</button>
          {/* <button className="button-cadastro" onClick={buscarClientes}>Buscar Cliente</button> */}
          
        </div>

      </div>
      <br></br><br/>
          <p>Aqui está uma lista de todos os seus clientes!</p>
          <br/><br/>
          <div className="input-group">
            <input className='pesquisar' type="search" placeholder="Pesquisar..." onChange={handleSearch}/>
            <div className="input-group-append">
              <div className="input-group-text"><ion-icon name="search-outline"></ion-icon></div>
            </div>
          </div>
          <ul className="list">
            {searchQuery.length > 0 && filteredClientes.length === 0 ? (
              <li>
                <strong>Cliente não encontrado... :(</strong>
              </li>
            ) : (
              filteredClientes.map((cliente) => {
                return (
                  <li key={cliente.id}>
                    <strong>ID: {cliente.id}</strong> <br/>
                    <span>Nome: {cliente.nome} </span> <br/>
                    <span>Propriedade: {cliente.propriedade}</span> <br/>
                    <button className="list-button"><Link className="list-button" to={`/detalhes/${cliente.id}`}>Saiba Mais!</Link></button>
                    <button onClick={ () => excluirCliente(cliente.id) } className="lixo"> <i className="bx bx-trash"></i></button> <br/><br/>
                    <Link className="button-editar" to ={`/editar/${cliente.id}`}>Editar Cliente</Link> <br/><br/><br/>
                  </li>
                );
              })
            )}
          </ul>
          
        </main> 
        <Footer/>
      </div>
  );
}

export default CadastroCliente;