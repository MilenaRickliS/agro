import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Provider from './contexts/Provider';
import {AuthProvider} from './contexts/authContext'
import RoutesApp from './routes';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Provider>
        <ToastContainer autoClose={3000} />
        <RoutesApp/>
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;