import Shimmer from './Shimmer'
import {useParams} from 'react-router-dom'
import useRestaurantMenu from '../../utils/useRestaurantMenu';
import RestaurantCategory from './RestaurantCategory';
import { useState } from 'react';
const RestaurantMenu=()=>{
    //this is a json file
    const { resId }=useParams();

    const resInfo=useRestaurantMenu(resId);

    const [showIndex,setShowIndex]=useState(null);

    if(resInfo==null) return <Shimmer/> ;

    const inf=resInfo?.cards[2]?.card?.card?.info;

    const itemCards=resInfo.cards[4].groupedCard.cardGroupMap.REGULAR.cards[2].card.card.itemCards;

    const dealsList=resInfo.cards[3].card.card.gridElements.infoWithStyle.offers;

    // console.log(resInfo.cards[4].groupedCard.cardGroupMap.REGULAR.cards);

    const categories=resInfo.cards[4].groupedCard.cardGroupMap.REGULAR.cards.filter(c=> c?.card?.card?.["@type"]==='type.googleapis.com/swiggy.presentation.food.v2.ItemCategory');

    const dummy="dummy data";
    // console.log(categories);
    return(
        <div className="text-center">
            <h1 className='font-bold my-6 text-2xl'>{inf.name}</h1>
            <div className="res-details" >
                <p className='font-bold text-md'>{inf.avgRating+'.0'+' ('+inf.totalRatingsString+ ') • '+inf.costForTwoMessage }</p>
                {/* <p>{inf.cuisines.join(", ")}</p>
                <p>Oulet {inf.locality}</p>
                <p>{inf.sla.slaString.toLowerCase()}</p> */}
                {/* <p>{removeBoldTags(inf.expectationNotifiers[0].enrichedText)}</p> */}
                {/*accoridam*/
                 categories.map((category,index)=>(
                    //this is a controlled component
                    <RestaurantCategory 
                        key={category?.card?.card?.title} 
                        data={category?.card?.card}  
                        showItems={index===showIndex} 
                        setShowIndex={()=> setShowIndex(index===showIndex ? null : index)}   
                        dummy={dummy}
                    />
                 ))}
            </div>

           
            
        </div>
    )
}
export default RestaurantMenu;
