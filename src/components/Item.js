import {useState} from 'react';
import EditItem from './EditItem';


const Item = ({category , handleSubmit , handleDelete}) => {
  const [editPop, setEditPop] = useState(false);
  const [itemCat, setItemCat] = useState();

  const  numberWithCommas = (x) => {
    x = x.toString();
    let  pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

  const handleEdit = id =>{
    setItemCat(category.filter(item => item._id === id));
    setEditPop(true)
  }

  const formatText = text =>{
    let txt;

    if(text.length > 10){
      txt = text.slice(0, 8);
      txt = txt + "...";
    }else{
      txt = text;
    }
    return txt;
  }

  return (<>
    {editPop ? (<EditItem setStats={setEditPop} prev={itemCat} handleSubmit={handleSubmit} />) : ""}
      {
        category.map(item =>(
          <figure key={item._id} className='centerfy'>
          <div className='centerfy-col'>
              <h3>Name : {formatText(item.name)}</h3>
              <h3>Amount :<span className='symbol'>R </span> {numberWithCommas(item.amount)}</h3>
          </div>
          <div className='centerfy-col btns'>
              <button className='del' onClick={()=>handleDelete(item._id)}>delete</button>
              <button className='edt' onClick={()=>handleEdit(item._id)} >edit</button>
          </div>
      </figure>   
      ))
      }
  </>)
}

export default Item;