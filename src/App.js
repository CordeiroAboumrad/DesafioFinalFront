import React, { useState, useEffect } from 'react';
import css from './components/app.module.css';
import Options from './Options.js';
import { set } from 'mongoose';
import TransactionDataService from './apiService.js';

export default function App() {

  let [transaction, setTransaction] = useState([]);
  let [transportedBoolean, setTransportedBoolean] = useState(false);

  let [newFormBoolean, setNewFormBoolean] = useState(false);
  const [id, setId] = useState('');
  let [description, setDescription] = useState('');
  let [category, setCategory] = useState('');
  let [day, setDay] = useState(0);
  let [month, setMonth] = useState(0);
  let [type, setType] = useState('');
  let [value, setValue] = useState(0);
  let [year, setYear] = useState(0);
  let [yearMonth, setYearMonth] = useState('');
  let [yearMonthDay, setYearMonthDay] = useState('');

  const [existingTransaction, setExistingTransaction] = useState({
    "_id": id,
    "category": category,
    "day": day,
    "description": description,
    "month": month,
    "type": type,
    "value": value,
    "year": year,
    "yearMonth": yearMonth,
    "yearMonthDay": yearMonthDay
  });

  useEffect(() => {

    setId(transaction._id);
    setCategory(transaction.category);
    setDescription(transaction.description);
    setYearMonthDay(transaction.yearMonthDay);
    setType(transaction.type);
    setValue(transaction.value);


  }, [transaction]);


  useEffect(() => {

    sendUpdatedTransaction();

  }, [existingTransaction]);



  async function modifyBoolean(bool, chosenTransaction) {
    setTransportedBoolean(bool);
    setTransaction(chosenTransaction);

    if (bool) {
      window.scrollTo(0, 0);
    }
  }


  function closeForm() {
    setTransportedBoolean(false);
  }

  // function chooseExpense(transaction){
  //   let modifiedTransaction = transaction;
  //   modifiedTransaction.type = "-";
  //   console.log(transaction);
  //   setTransaction(modifiedTransaction);
  // }

  // function chooseEarning(transaction){
  //   let modifiedTransaction = transaction;
  //   modifiedTransaction.type = "+";
  //   console.log(transaction);
  //   setTransaction(modifiedTransaction);
  // }

  function alteredDate(event) {
    console.log('Data alterada');
    setYearMonthDay(event.target.value);
    // console.log(yearMonthDay);
  };


  function alteredInputValue(event) {
    console.log('Valor alterado');
    setValue(event.target.value);
    console.log(value);
  };


  function alteredCategory(event) {
    console.log('Category alterada');
    setCategory(event.target.value);
    console.log(category);
  };


  function alteredDescription(event) {
    console.log('Description alterado');
    setDescription(event.target.value);
    console.log(description);
  };


  function chooseIncome() {
    console.log('Receita escolhida');
    setType('+');
  };


  function chooseExpense() {
    console.log('Despesa escolhida');
    setType('-');
  };


  async function editTransaction() {
    console.log('Foi!');



    setExistingTransaction({
      "category": category,
      "day": yearMonthDay.substr(8, 2),
      "description": description,
      "month": yearMonthDay.substr(5, 2),
      "type": type,
      "value": value,
      "year": yearMonthDay.substr(0, 4),
      "yearMonth": yearMonthDay.substr(0, 7),
      "yearMonthDay": yearMonthDay
    });

    setTransportedBoolean(false);
  };
  

  async function sendUpdatedTransaction(){

    console.log(existingTransaction);
    console.log(id);
    TransactionDataService.editTransaction(id, existingTransaction);
    
    

  };

  return (
    <div>
      <h3 className={css.head}>Bootcamp Full Stack- Desafio Final</h3>
      <h4 className={css.subHead}>Controle Financeiro Pessoal</h4>

      <div>
        {transportedBoolean && (

          <div>

            <div className={css.styleBox}>
              <div>

                <div className={css.formHeader}>
                  <h3 className={css.titleFormHeader}>Edição de Lançamento</h3>
                  <button onClick={closeForm} className="waves-effect waves-light btn red darken-4">X</button>
                </div>

                <form>
                  <div className={css.bodyFormat}>

                    <div className={css.bodyHeader}>

                      <label className={css.label}>
                        <input name="expense-earning" type="radio" onClick={chooseIncome} disabled="" value="+" />
                        <span>
                          Receita
                      </span>
                      </label>

                      <label className={css.label}>
                        <input name="expense-earning" type="radio" onClick={chooseExpense} disabled="" value="-" />
                        <span>
                          Despesa
                      </span>
                      </label>

                    </div>

                    <div className="input-field">
                      <input id="inputDescription" type="text" placeholder={transaction.description} onChange={alteredDescription} required="" value={description} />
                      <label htmlFor="inputDescription" className="active">
                        Descrição:
                      </label>
                    </div>

                    <div className="input-field">
                      <input id="inputCategory" type="text" placeholder={transaction.category} onChange={alteredCategory} required="" value={category} />
                      <label htmlFor="inputCategory" className="active">
                        Categoria:
                      </label>
                    </div>

                    <div className={css.valueAndDateField}>
                      <div className={css.inputField} className="input-field">
                        <input id={value} placeholder={transaction.value} type="number" onChange={alteredInputValue} min={0} step={0.01} max={10000000000} />
                        <label htmlFor="inputValue" className="active">
                          Valor:
                        </label>
                      </div>

                      <input placeholder={transaction.yearMonthDay} type="text" onChange={alteredDate} className="browser-default" required="" value={yearMonthDay} />

                    </div>

                    <div className="input-field">
                      <input id="readOnlyId" readOnly type="text" required="" value={transaction._id} />
                      <label htmlFor="inputCategory" className="active">
                        Id:
                      </label>
                    </div>

                  </div>
                  <a href={editTransaction} type="submit" onClick={editTransaction} className="waves-effect waves-light btn">Salvar</a>
                </form>

              </div>
            </div>

          </div>

        )}</div>



      <div className={css.selectCase}>
        <Options booleanTransport={modifyBoolean} />
      </div>

    </div>


  );

}
