import React, { useState, useEffect, useRef, useContext } from "react";
import "./style.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header"
import AppContext from "../../contexts/AppContext";
import { db } from '../../services/firebaseConnection';
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';

const Inicio = () => {
  const { totalRef } = useContext(AppContext);
  const [items, setItems] = useState([]);
  const [descItem, setDescItem] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Entrada");
  const [searchQuery, setSearchQuery] = useState("");
  const [lista, setLista] = useState([]);
  const incomesRef = useRef(null);
  const expensesRef = useRef(null);
  const racaoRef = useRef(null);
  const totalFinalRef = useRef(null);

const [filteredItems, setFilteredItems] = useState([]);
const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
const [cache, setCache] = useState({});

  useEffect(() => {
    async function loadClientes() {
      const unsub = onSnapshot(collection(db, "clientes-di"), (snapshot) => {
        let listaClientes = [];
        snapshot.forEach((doc) => {
          listaClientes.push({ quantRacaoMes: doc.data().quantRacaoMes });
        });
        setLista(listaClientes);
      });
    }
    loadClientes();
  }, []);

  const getTotalsRacao = () => {
    let totalRacao = 0;
    lista.forEach((item) => {
      totalRacao += parseFloat(item.quantRacaoMes) || 0;
    });
    if (racaoRef.current) {
      racaoRef.current.innerHTML = totalRacao.toFixed(2);
    }
    const totalEstoque = totalRef.current ? parseFloat(totalRef.current.innerHTML) || 0 : 0;
    const totalFinal = totalEstoque - totalRacao;
    if (totalFinalRef.current) {
      totalFinalRef.current.innerHTML = totalFinal.toFixed(2);
      if(totalFinal<0){
        totalFinalRef.current.style.color = "red";
      }else{
        totalFinalRef.current.style.color = "green";
      }
    }
  };

  useEffect(() => {
    async function load() {
      const unsub = onSnapshot(collection(db, "estoque"), (snapshot) => {
        let lista = [];
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            descItem: doc.data().descItem,
            amount: doc.data().amount,
            type: doc.data().type
          });
        });
        setItems(lista);
      });
    }
    load();
  }, []);

  async function handleNewItem() {
    if (descItem === "" || amount === "" || type === "") {
      return alert("Preencha todos os campos!");
    }
    await addDoc(collection(db, "estoque"), {
      descItem: descItem,
      amount: Math.abs(parseFloat(amount)).toFixed(2),
      type: type,
    })
      .then(() => {
        console.log("SUCESSO");
        setDescItem("");
        setAmount("");
        setType("Entrada");
      })
      .catch((error) => {
        console.log("ERRO " + error);
      });
  }

  async function deleteItem(id) {
    const docRef = doc(db, "estoque", id);
    await deleteDoc(docRef)
      .then(() => {
        alert("DELETADO COM SUCESSO!");
      });
  }

  const getTotals = () => {
    const amountIncomes = items
      .filter((item) => item.type === "Entrada")
      .map((transaction) => parseFloat(transaction.amount));

    const amountExpenses = items
      .filter((item) => item.type === "Saída")
      .map((transaction) => parseFloat(transaction.amount));

    const totalIncomes = amountIncomes.reduce((acc, cur) => acc + cur, 0);
    const totalExpenses = Math.abs(
      amountExpenses.reduce((acc, cur) => acc + cur, 0)
    );
    const totalItems = totalIncomes - totalExpenses;

    if (incomesRef.current) {
      incomesRef.current.innerHTML = totalIncomes.toFixed(2);
    }
    if (expensesRef.current) {
      expensesRef.current.innerHTML = totalExpenses.toFixed(2);
    }
    if (totalRef.current) {
      totalRef.current.innerHTML = totalItems.toFixed(2);
    }
  };

  useEffect(() => {
    getTotals();
    getTotalsRacao();
  }, [items, lista]);


  useEffect(() => {
  const debounceTimeout = setTimeout(() => {
    setDebouncedSearchQuery(searchQuery);
  }, 500);

  return () => {
    clearTimeout(debounceTimeout);
  };
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedSearchQuery === '') {
      setFilteredItems(items);
    } else {
      const cachedResult = cache[debouncedSearchQuery];
      if (cachedResult) {
        setFilteredItems(cachedResult);
      } else {
        const filteredItems = items.filter((item) =>
          item.descItem.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
          item.amount.toLowerCase().includes(debouncedSearchQuery)
        );
        setFilteredItems(filteredItems);
        setCache((prevCache) => ({ ...prevCache, [debouncedSearchQuery]: filteredItems }));
      }
    }
  }, [debouncedSearchQuery, items, cache]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // const filteredItems = items.filter((item) =>
  //   item.descItem.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   item.amount.toLowerCase().includes(searchQuery)
  // );

  return (
    <div>
      <Header />
      <main id="main" className="flexbox-col">
        <div className="container">
        <h2>Estoque</h2>
        <p>Atualize sempre que possível o seu estoque!</p>
        <div className="resume">
          <div>
            Entradas:
            <span ref={incomesRef}>0.00</span>
          </div>
          <div>
            Saídas:
            <span ref={expensesRef}>0.00</span>
          </div>
          {/* <div>
            Total:
            <span ref={totalRef}></span>
          </div> */}
        </div>
        <div className="newItem">
          <div className="divDesc">
            <label htmlFor="desc">Descrição</label>
            <input
              type="text"
              id="desc"
              value={descItem}
              onChange={(e) => setDescItem(e.target.value)}
            />
          </div>
          <div className="divAmount">
            <label htmlFor="amount">Quantidade de Ração</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="divType">
            <label htmlFor="type">Tipo</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Entrada">Entrada</option>
              <option value="Saída">Saída</option>
            </select>
          </div>
          <button id="btnNew" onClick={handleNewItem}>
            Incluir
          </button>
        </div>
        <br />
        <div className="input-group">
          <input
            className='pesquisar'
            type="search"
            placeholder="Pesquisar ..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <div className="input-group-append">
            <div className="input-group-text"><ion-icon name="search-outline"></ion-icon></div>
          </div>
        </div>
        <div className="divTable">
          <table>
            <thead>
              <tr>
                <th>Descrição</th>
                <th className="columnAmount">Quantidade de Ração</th>
                <th className="columnType">Tipo</th>
                <th className="columnAction"></th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.descItem}</td>
                      <td>{item.amount}</td>
                      <td className="columnType">
                        {item.type === "Entrada" ? (
                          <i className="bx bxs-chevron-up-circle"></i>
                        ) : (
                          <i className="bx bxs-chevron-down-circle"></i>
                        )}
                      </td>
                      <td className="columnAction">
                        <button onClick={() => deleteItem(item.id)}>
                          <i className="bx bx-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}><br/>
                    Item não encontrado ...:(
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="resume">
          <div>Total em seu estoque: <span ref={totalRef}>0.00</span></div>
          <div>Total que seus clientes precisam no mês: <span ref={racaoRef}>0.00</span></div>
          <div>Diferença: <span ref={totalFinalRef}>0.00</span></div>
        </div>
        </div>
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Inicio;