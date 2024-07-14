import { addItem } from '../../utils/cartSlice';
import { useDispatch } from 'react-redux';
import {CDN_URL} from '../../utils/constants'
import { removeItem } from '../../utils/cartSlice';
const ItemList=({items})=>{
    // console.log(dummy);
const dispatch=useDispatch();

const handleAddItems=(item)=>{
    dispatch(addItem(item))
}
const handleRemoveItem = (id) => {
    dispatch(removeItem({ id }));
  };
    return(
        <div>
            {items.map((item)=>(
                <div key={item.card.info.id}className="p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between"  >
                    <div className='w-9/12'>
                        <div className="py-2">
                            <span>{item.card.info.name}</span>
                            <span> - ₹ {item.card.info.price ? item.card.info.price/100 : item.card.info.defaultPrice/100 }</span>  
                        </div>
                        
                        <p className="text-xs">{item.card.info.description}</p>
                    </div>
                    <div> 
                        <div className='absolute flex justify-between'>
                            <button  onClick={()=>handleAddItems(item)}
                            className='p-2 mx-2 rounded-lg bg-white shadow-lg text-green-00' >
                                ADD +
                            </button>
                            <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="p-2 mx-2 bg-white shadow-lg text-green-00 rounded-xl"
                                >
                                REMOVE -
                                </button>
                        </div>
                        <img src={CDN_URL+item.card.info.imageId} className='w-40' ></img>
                    </div>
                </div>
            ))}   
        </div>
    );
};
export default ItemList;