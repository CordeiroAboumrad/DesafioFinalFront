import React, { useState, useEffect } from 'react';
import css from './components/app.module.css';
import { set } from 'mongoose';
import TransactionDataService from './apiService.js';
import ChangeHtml from './ChangeHtml';

export default function Options({ booleanTransport }) {
    let arrayDates = [];
    for (let year = 2019; year < 2022; year++) {
        for (let month = 1; month < 13; month++) {
            if (month < 10) {
                arrayDates.push(`${year}-0${month}`);
            } else {
                arrayDates.push(`${year}-${month}`);
            }
        }
    }


    let [index, setIndex] = useState(0);
    let [arrayOfTransactions, setArrayOfTransactions] = useState([]);
    let [filteredArray, setFilteredArray] = useState(arrayOfTransactions);

    let [revenue, setRevenue] = useState(0);
    let [expense, setExpense] = useState(0);
    let [boolean, setBoolean] = useState(false);
    let [chosenTransaction, setChosenTransaction] = useState([]);
    let [newFormBoolean, setNewFormBoolean] = useState(false);
    let [day, setDay] = useState(0);
    let [month, setMonth] = useState(0);
    let [type, setType] = useState('');
    let [value, setValue] = useState(0);
    let [year, setYear] = useState(0);
    let [yearMonth, setYearMonth] = useState('');
    let [yearMonthDay, setYearMonthDay] = useState('');
    let [description, setDescription] = useState('');
    let [category, setCategory] = useState('');

    const [newTransaction, setNewTransaction] = useState({
        
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

        console.log('Booleano modificado!');
        booleanTransport(boolean, chosenTransaction);

    }, [boolean])

    useEffect(() => {

        updateList();

    }, [index]);


    useEffect(() => {

        obtainRevenues();
        obtainExpenses();
        setFilteredArray(arrayOfTransactions);

    }, [arrayOfTransactions]);


    useEffect(() => {

        obtainRevenues();
        obtainExpenses();

    }, [filteredArray]);


    useEffect(() => {

        postTransaction();

    }, [newTransaction]);



    async function updateList() {

        return TransactionDataService.getAll(await arrayDates[index])
            .then(async (response) => {
                console.log(await response.data);
                setArrayOfTransactions(await response.data);
            });

    }


    async function decreaseArray() {
        index = index - 1;
        setIndex(index);
        console.log(`Index number: ${index}`);
        console.log(arrayDates[index]);

    }

    async function increaseArray() {
        index = index + 1;
        setIndex(index);
        console.log(`Index number: ${index}`);
        console.log(arrayDates[index]);

    }


    async function handleChange(event, key) {
        console.log(event.target.value);
        index = arrayDates.indexOf(event.target.value);
        setIndex(arrayDates.indexOf(event.target.value));

        console.log(`Index number: ${index}`);
        // console.log(arrayDates[index]);

    }


    async function obtainRevenues() {
        console.log('Receitas: ');
        console.log(filteredArray);

        let soma = 0;
        const filtradas = filteredArray.filter(transactions => (
            transactions.type === "+"
        )).map(filtrada => {
            return {
                valor: filtrada.value
            }
        }).forEach(transacao => {
            soma += transacao.valor;
        });

        console.log(soma);

        setRevenue(soma);

    }


    async function obtainExpenses() {
        console.log('Despesas: ');

        let soma = 0;
        const filtradas = filteredArray.filter(transactions => (
            transactions.type === "-"
        )).map(filtrada => {
            return {
                valor: filtrada.value
            }
        }).forEach(transacao => {
            soma += transacao.valor;
        });

        console.log(soma);

        setExpense(soma);
    }


    async function changeBoolean(bool, transaction) {
        setChosenTransaction(transaction);
        toggleBoolean(bool);
    }

    async function toggleBoolean(bool) {
        setBoolean(bool);
    }

    function openForm() {
        setNewFormBoolean(true);
    }

    function closeForm() {
        setNewFormBoolean(false);
    }


    function onChangeTextFilter(event) {

        console.log(`Array de transactions:`);
        console.log(arrayOfTransactions);
        const filtradas = arrayOfTransactions.filter(transactions => (
            transactions.description.toLowerCase().includes((event.target.value).toLowerCase())
        ));
        console.log(typeof(event.target.value));
        console.log(filtradas);
        setFilteredArray(filtradas);
    };


    
    
    function alteredDescription(event){
        console.log('Description alterado');
        setDescription(event.target.value);
        console.log(description);
    };
    
    
    function alteredCategory(event){
        console.log('Category alterada');
        setCategory(event.target.value);
        console.log(category);
    };
    
    
    function alteredDate(event){
        // console.log('Data alterada');
        setYearMonthDay(event.target.value);
        // console.log(yearMonthDay);
    };


    function alteredInputValue(event){
        console.log('Valor alterado');
        setValue(event.target.value);
        console.log(value);
    }
    
    
    function chooseIncome(){
        console.log('Receita escolhida');
        setType('+');
    };
    

    function chooseExpense(){
        console.log('Despesa escolhida');
        setType('-');
    }
    
    
    async function createNewTransaction(event) {
        event.preventDefault();
        

        setNewTransaction({
            "category": category,
            "day": yearMonthDay.substr(8,2),
            "description": description,
            "month": yearMonthDay.substr(5,2),
            "type": type,
            "value": value,
            "year": yearMonthDay.substr(0,4),
            "yearMonth": yearMonthDay.substr(0,7),
            "yearMonthDay": yearMonthDay
        });


        
    };
    
    
    async function postTransaction(){

        console.log('Transação enviada para criação.');
        console.log(newTransaction);
        TransactionDataService.createTransaction(newTransaction);
        setNewFormBoolean(false);

    };


    
    return (
        <div>
            <div className={css.selectCase}>
                <a href={decreaseArray} className="waves-effect waves-light btn" onClick={decreaseArray}>&lt;</a>

                <div className={css.space}>

                    <select onChange={handleChange} className="browser-default" value={arrayDates[index]}>{arrayDates.map((date, index) => (
                        <option value={date} key={index}>
                            {date}
                        </option>
                    ))}

                    </select>
                </div>

                <a href={increaseArray} className="waves-effect waves-light btn" onClick={increaseArray}>&gt;</a>
            </div>



            <div className={css.resultBox}>
                <span><strong>Lançamentos: {filteredArray.length}</strong></span>

                <span><strong>Receitas: {
                    revenue
                }</strong></span>

                <span><strong>Despesas: {
                    expense
                }</strong></span>
                <span><strong>Saldo: {
                    revenue - expense
                }</strong></span>
            </div>

            <div className={css.button}>
                <a href={openForm} onClick={openForm} className="waves-effect waves-light btn">+ Novo</a>
                <div className={css.formatInput}>
                    <input type="text" onChange={onChangeTextFilter} placeholder="Pesquise aqui"></input>
                </div>
            </div>


            <ChangeHtml value={filteredArray} onChangeBoolState={changeBoolean} />





            <div>
                {newFormBoolean && (

                    <div>

                        <div className={css.styleBox}>
                            <div>

                                <div className={css.formHeader}>
                                    <h3 className={css.titleFormHeader}>Nova Transação</h3>
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
                                            <input id="inputDescription" type="text" onChange={alteredDescription} required="" value={description} />
                                            <label htmlFor="inputDescription" className="active">
                                                Descrição:
                      </label>
                                        </div>

                                        <div className="input-field">
                                            <input id="inputCategory" type="text" onChange={alteredCategory} required="" value={category} />
                                            <label htmlFor="inputCategory" className="active">
                                                Categoria:
                      </label>
                                        </div>

                                        <div className={css.valueAndDateField}>
                                            <div className={css.inputField} >
                                                <input id={value} type="number" onChange={alteredInputValue} min={0} step={0.01} max={10000000000} />
                                                <label htmlFor="inputValue" className="active">
                                                    Valor:
                        </label>
                                            </div>

                                            <input placeholder="yyyy-mm-dd" type="text" onChange={alteredDate} className="browser-default" required="" value={yearMonthDay} />

                                        </div>

                                    </div>
                                    <a href={createNewTransaction} type="submit" onClick={createNewTransaction} className="waves-effect waves-light btn">Salvar</a>
                                </form>

                            </div>
                        </div>
                        

                    </div>

                )}</div>








        </div>
    )
}
