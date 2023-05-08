import React, { useState  , useEffect } from 'react'
import Item from './Item';

const Transactions = ({ data , handleDelete , handleSubmit }) => {


    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [totals, setTotals] = useState()

    const  numberWithCommas = (x) => {
        x = x.toString();
        let  pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
        return x;
    }

    


    const setCategories =  () =>{
        setExpenses(data.filter(item => item.type === "expense"));
        setIncomes( data.filter(item => item.type === "income"));
    }

    const getTotals =  () =>{
        const sunEpx =  expenses.map(item => item.amount) ;
        const sunIncm =  incomes.map(item => item.amount) ;

        const TotalExps = sunEpx.reduce((a, b) => {
            return a + b;
        }, 0);

        const TotalInc = sunIncm.reduce((a, b) => {
            return a + b;
        }, 0);

     
    return numberWithCommas(TotalInc - TotalExps);
        
    }


useEffect(() => {
    setCategories()  
}, [data])

  
    
  return (<>
    <article className='transactions'>
        <aside>
        { incomes ? <Item category={incomes} handleSubmit={handleSubmit}  handleDelete={handleDelete}/>: "" }
        </aside>
        <aside>
            { expenses ? <Item category={expenses} handleSubmit={handleSubmit}  handleDelete={handleDelete} />: "" }
        </aside>
    </article>
    <div id="total">
        <aside className="centerfy">
            <h2 className='balance'>Balance : </h2>
            <h2><span className="symbol">R </span>{getTotals()}</h2>
        </aside>
    </div>
  </>)
}

export default Transactions;