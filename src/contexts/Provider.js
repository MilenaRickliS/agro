import React, { useState, useRef } from 'react';
import propTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {

  // Estado para armazenar a quantidade de ração por mês.
  const [quantRacaoMes, setQuantRacaoMes] = useState('');
  // Estado para armazenar a quantidade de ração por semana.
  const [quantRacaoSem, setQuantRacaoSem] = useState('');
  const [clientes, setClientes] = useState([]);
  const [quantTotal, setQuantTotal] = useState([]);
  const totalRef = useRef(null);
  


  const value = {
    quantRacaoMes,
    setQuantRacaoMes,
    quantRacaoSem,
    setQuantRacaoSem,
    clientes,
    setClientes,
    quantTotal,
    setQuantTotal,
    totalRef    
  };

  return (
    <AppContext.Provider value={ value }>
      {children}
    </AppContext.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: propTypes.any,
}.isRequired;