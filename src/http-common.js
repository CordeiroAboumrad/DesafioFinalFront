import axios from 'axios';

// const API_URL = 'http://localhost:3001/grade/';

// Define a URL base da origem para consumo do serviço
export default axios.create({
    // baseURL: 'http://localhost:3001/api/transaction',
    baseURL: "https://controlador-financeiro.herokuapp.com/api/transaction",
    headers: {
      'Content-type': 'application/json',
    },
  });

// A URL de conexão é fornecida pelo Heroku
