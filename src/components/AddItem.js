import { useState  } from 'react';

const AddItem = ({ setStats , handleAdd }) => {

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
            let preparedData = {
                name,
                amount : parseFloat(amount),
                type : toLowerTyp
             }
            handleAdd(preparedData);
            setName("");
            setAmount("");
            setType("");
        }else{
            console.log(errors)
        }
       
    }

  return (
    <article id="add-form" className="form">
        <div className="close">
            <button onClick={()=>setStats(false)}>X</button>
        </div>
        <form>
            <div className="centerfy">
                <input type="text" placeholder='Name of transaction'  onChange={(e)=>setName(e.target.value)} />
            </div>
            <div className="centerfy">
                <input type="number" placeholder='Amount of transaction' onChange={(e)=>setAmount(e.target.value)}/>
            </div>
            <div className="centerfy-col">
                <select onChange={(e)=>setType(e.target.value)}>
                    <option>Choose</option>
                    <option>Expense</option>
                    <option>Income</option>
                </select>
            </div>
            <div className="centerfy">
                <button onClick={(e)=>startValidations(e)}>Add</button>
            </div>
        </form>
    </article>
  )
}

export default AddItem;