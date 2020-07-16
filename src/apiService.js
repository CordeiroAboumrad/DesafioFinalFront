import axios from 'axios';
import http from './http-common.js';


const getAll = (date) => {
    return http.get(`/${date}`);
};

const deleteTransaction = (id) => {
  return http.delete(`/${id}`);
};


const createTransaction = (body) => {
  return http.post(`/`, body);
}

const editTransaction = (id, body) => {
  return http.put(`/${id}`, body);
}




export default{
  getAll,
  deleteTransaction,
  createTransaction,
  editTransaction
};