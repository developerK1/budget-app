import { useState , useEffect} from 'react';
import './App.css';
import AddItem from './components/AddItem';
import Header from './components/Header';
import Transactions from './components/Transactions';

function App() {

  const [addtPop, setAddPop] = useState(false);
  const [transactions, setTransactions] = useState([])

  //ADDING DATA TO DATABASE
  const handleAdd = async (newData) =>{
  
    const res = await fetch('https://budget-app.herokuapp.com/transaction/add', {
      method : "POST",
      headers : {
        'Content-type' : 'application/json',
      },
      body : JSON.stringify(newData)
    })
  
    const data = await res.json();
    setTransactions([...transactions,data ])

  }

  //DELETING FROM DATABASE
 const handleDelete = async id =>{
  await fetch(`https://budget-app.herokuapp.com/transaction/${id}`, {
    method : 'DELETE'
  })
  setTransactions(transactions.filter(item => item._id !== id));
 }

 //EDITING DATA TO DATABASE
 const handleSubmit = async (newData) =>{
 
  const res = await fetch(`https://budget-app.herokuapp.com/transaction/update/${newData._id}`, {
      method : "POST",
      headers : {
        'Content-type' : 'application/json',
      },
      body : JSON.stringify(newData)
    })
    const data = await res.json();

    console.log(data)


  const newSet = transactions.filter(item => item._id !== newData._id)
  setTransactions([...newSet,newData ])
}


useEffect(()=>{
  const getTransactions = async () =>{
    const res = await fetch("https://budget-app.herokuapp.com/transaction");
    const data = await res.json();
  
    setTransactions(data)
  }

  getTransactions()

}, [])



  return (
    <main >
      <div className="app">
        <div className="centerfy header">
          <h2>Transactions</h2>
          <button onClick={()=>setAddPop(true)}>ADD</button>
        </div>
        
        {addtPop ? (<AddItem  setStats={setAddPop} handleAdd={handleAdd}/>) : ""}
        <section id="transaction">
          <Header />
          <Transactions data={transactions} handleDelete={handleDelete} handleSubmit={handleSubmit}/>
        </section>
      </div>
    </main>
  );
}

export default App;
