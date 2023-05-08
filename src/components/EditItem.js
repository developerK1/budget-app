import { useState , useEffect } from 'react';

const EditItem = ({  setStats , prev , handleSubmit}) => {

    const [name, setName] = useState()
    const [amount, setAmount] = useState()
    const [type, setType] = useState()
    const [errors, setErrors] = useState({})

    //HELPER FUNCTIONS
    const startValidations = e =>{
        e.preventDefault();
        setErrors({})
        let Errors = {};

        if(!name){
            Errors.name = "Name cannot be Empty";
        }
        if(!amount){
            Errors.amount = "Amount cannot be Empty";
        }

        !name || !amount ? setErrors(Errors) : setNewData() ;
       
    }



const setNewData = () =>{
    let toLowerTyp = type.toLowerCase();

    if(Object.keys(errors).length === 0){
       handleSubmit({
        _id : prev[0]._id,
        name,
        amount : parseFloat(amount),
        type : toLowerTyp
       });
        setName("");
        setAmount("");
        setType("");
    }else{
        console.log(errors)
    }
     
}


useEffect(() => {
    setName(prev[0].name)
    setAmount(prev[0].amount)
    setType(prev[0].type)
}, [prev])

  return (
    <article id="edit-form" className="form">
        <div className="close">
            <button onClick={()=>setStats(false)}>X</button>
        </div>
        <form>
            <div className="centerfy">
                <input type="text" placeholder='Name of transaction' value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className="centerfy">
                <input type="number" placeholder='Amount of transaction' value={amount} onChange={(e)=>setAmount(e.target.value)}/>
            </div>
            <div className="centerfy-col">
                
                    {prev[0].type === "income" ? (
                        <select onChange={(e)=>setType(e.target.value)}>
                            <option>Income</option>
                            <option>Expense</option>
                        </select>
                    ):(
                        <select onChange={(e)=>setType(e.target.value)}>
                            <option>Expense</option>
                            <option>Income</option>
                        </select>
                    )}                  
                
            </div>
            <div className="centerfy">
                <button onClick={(e)=>startValidations(e)}>Save</button>
            </div>
        </form>
    </article>
  )
}

export default EditItem;