import {CDN_URL} from '../../utils/constants.js'//VARIABLE

const RestaurantCard = (props) => {
    const {resData}=props;
    const { name,cuisines,cloudinaryImageId,avgRating} = resData.info;
    const deliveryTime=resData.info.sla.deliveryTime;
  
    // Construct the image URL using cloudinaryImageId
    const imageUrl = `${CDN_URL}${cloudinaryImageId}`;
  
    return (
      <div className="w-60 h-80 m-2 p-4 flex flex-col justify-between rounded-lg bg-gray-100 hover:bg-gray-200 shadow-lg overflow-hidden">
      <img
        className="w-full h-32 object-cover rounded-lg mb-4"
        alt={name}
        src={imageUrl} // Use the constructed imageUrl here
      />
      <div className="flex flex-col flex-grow justify-between">
        <div>
          <h3 className="font-bold text-lg mb-2 truncate">{name}</h3>
          <p className="text-gray-600 mb-2 truncate">{cuisines.join(", ")}</p>
        </div>
        <div>
          <p className="text-gray-700 mb-2">Avg. Rating: {avgRating}</p>
          <p className="text-gray-700">Delivery Time: {deliveryTime} mins</p>
        </div>
      </div>
    </div>
    );
  };

  export const withPromotedLabel=(RestaurantCard)=>{
    return (props)=>{
      return (
        <div>
          
          <label className="absolute bg-black text-white m-2 p-2 rounded-lg">Promoted</label>
          <RestaurantCard {...props}/>
        </div>
      );
    };
  };
export default RestaurantCard;