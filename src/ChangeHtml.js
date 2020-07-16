import React, { useState, useEffect } from 'react';
import css from './components/app.module.css';
import TransactionDataService from './apiService.js';

export default function ChangeHtml({ value, onChangeBoolState }) {
  let [transactions, setTransactions] = useState(value);
  let [boolState, setBoolState] = useState(false);


  
  
  
  useEffect(() => {
    
    console.log('Mudança efetuada em transactions');
    
  }, [transactions])
  
  
  useEffect(() => {
    
    console.log('Toggle ativado/desativado');
      onChangeBoolState(boolState, transactions);
    
  }, [boolState])
  
  
  function editItem(transactionObject) {
    setTransactions(transactionObject);
    toggle();
  }
  
  function toggle() {
      setBoolState(!boolState);
  };
  
  
  function deleteItem(transactionObject) {
    TransactionDataService.deleteTransaction(transactionObject._id);
    setTransactions(value);
    alert('Elemento deletado com sucesso.');
    window.location.reload(true);
  }

  return (
    <div>{value.map((transaction, index) => (


      <div className={css.indexResults} key={index}>

        <div>
          <span className={css.adjustDay}>{transaction.day}</span>

          <div className={css.x}>

            <div className={css.subGroup}>
              <span className={css.title}>{transaction.category}</span>
              <span className={css.subtitle}>{transaction.description}</span>
            </div>

            <span className={css.amount}>R$&nbsp;{transaction.value},00</span>

          </div>

          <div className={css.smallIcons}>

            <span className={css.edit}><i onClick={() =>  editItem(transaction) } className="material-icons">create</i></span>
            <span className={css.remove}><i onClick={() => deleteItem(transaction)} className="material-icons" >delete</i></span>

          </div>

        </div>

      </div>



    ))}
    </div>


  )
}
