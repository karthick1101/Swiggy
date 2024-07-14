import ItemList from "./ItemList.js";
const RestaurantCategory=({data,showItems,setShowIndex,dummy})=>{

    const handleClick=()=>{
        setShowIndex();
    };

    // console.log(data);
    return(
        <div>
        {/*Header*/ }
        <div className="w-6/12 brg-gray-50 shadow-lg p-4 mx-auto my-4 ">
            <div className="flex justify-between cursor-pointer" onClick={handleClick} >
                <span className="font-bold text-sm">{data.title} ({data.itemCards.length})</span>
                <span>⬇️</span>
            </div>
           { showItems && <ItemList items={data.itemCards}  dummy={dummy} />}
        </div>
        {/*Body*/ }
        
    </div>
    );
};
export default RestaurantCategory 