import React from 'react'; // sintaxe JSX
import ReactDOM from 'react-dom/client'; // conecta o react ao DOM do navegador
import './styles/index.css';
import Home from './pages/Home';
import reportWebVitals from './reportWebVitals'; // não é obrigatório

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
); // renderiza na root o componente principal

reportWebVitals();
