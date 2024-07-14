import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Shimmer from './Shimmer';
import RestaurantCard, { withPromotedLabel } from './RestaurantCard';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../../utils/useOnlineStatus';
import UserContext from '../../utils/UserContext';

const Body = () => {
  const { param } = useParams();

  const [listOfRestaurants, setListOfRestaurant] = useState([]);
  const [filteredRestaurants, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState('');

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      'https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.028096&lng=80.2419814&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING'
    );
    const json = await data.json();

    setListOfRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);

    setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false)
    return <h1 className="text-center">Looks like you're offline, Please check your internet connection</h1>;

  const { loggedInUser, setUserName } = useContext(UserContext);

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex flex-col sm:flex-row sm:justify-between p-6 space-y-6 sm:space-y-0">
        <div className="search flex flex-col sm:flex-row sm:items-center sm:space-x-6 flex-1">
          <input
            type="text"
            placeholder="Search"
            className="placeholder-gray-500 border border-solid border-black p-3 flex-1"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="py-3 px-5 bg-green-100 mt-3 sm:mt-0 sm:ml-6 rounded-lg"
            onClick={() => {
              if (searchText === '') alert('Please Enter Something');
              const filteredList = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurant(filteredList);
              setSearchText('');
            }}
          >
            Search
          </button>
        </div>
        <div className="search flex justify-center sm:justify-start sm:items-center sm:space-x-6 flex-1">
          <button
            className=" m-2 py-3 px-5 bg-gray-100 w-full sm:w-auto"
            onClick={() => {
              const filteredList = listOfRestaurants.filter((res) => res.info.avgRating > 4);
              setFilteredRestaurant(filteredList);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
        <div className="search flex flex-col sm:flex-row sm:items-center sm:space-x-6 flex-1">
          <label>UserName:</label>
          <input
            value={loggedInUser}
            className="border border-black p-3 mt-3 sm:mt-0 flex-1"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-evenly">
        {filteredRestaurants.map((restaurant) => (
          <Link key={restaurant.info.id} to={'/restaurants/' + restaurant.info.id}>
            {restaurant.info.avgRating > 4.5 ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;



// import {useState,useEffect,useContext} from 'react'
// import { useParams } from 'react-router-dom'
// import Shimmer from './Shimmer'
// import RestaurantCard,{withPromotedLabel} from './restaurantCard'
// import {Link} from 'react-router-dom'
// import useOnlineStatus from '../../utils/useOnlineStatus'
// import UserContext from '../../utils/UserContext'

// const Body=()=>{
//   const {param}=useParams();
  
//   const [listOfRestaurants,setListOfRestaurant]=useState([]);
//   const [filteredRestaurants,setFilteredRestaurant]=useState([]);

//   const [searchText,setSearchText]=useState("");

//   const  RestaurantCardPromoted=withPromotedLabel(RestaurantCard);

//   useEffect(()=>{
//     fetchData();
//   },[]);

//   const fetchData= async ()=>{
//     const data=await fetch ('https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.028096&lng=80.2419814&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');
//     const json= await data.json();

//     // console.log(json);
//     setListOfRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)  
    
//     // console.log(setListOfRestaurant)
//     setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
//   }
//   const onlineStatus=useOnlineStatus();
//   if(onlineStatus==false) return <h1 className='text-center'>Looks like you're offline,Please check ur internet connection</h1>


//   const {loggedInUser,setUserName}=useContext(UserContext)
//   //conditional rendering 
//   return (listOfRestaurants.length===0) ?  
//     <Shimmer/> 
//     : 
//     (
//       <div className="body">
//           <div className="filter flex ">
//               <div className='search m-4 p-4'>
//               <input type='text' placeholder='Search' className='placeHolder border border-solid border-black' value={searchText}  
//               onChange={(e) => {
//                 setSearchText(e.target.value);
//               }} 
//               />
//               <button className='py-2 px-4 bg-green-100 m-4 rounded-lg'
//                 onClick={
//                 ()=>{
//                   //filter the cards and update UI
//                   //search text
//                   // console.log(searchText);
//                   if(searchText==="") alert('Please Enter Something');
//                   const filteredList=listOfRestaurants.filter(
//                     (res)=>res.info.name.toLowerCase().includes(searchText.toLowerCase())
//                   );
//                   setFilteredRestaurant(filteredList);
//                   setSearchText("");
//                 }} 
//                 >
//                 Search
//                 </button>
//               </div>
//               <div className='search m-2 p-2 flex items-center'>
//                 <button className='py-2 px-4 bg-gray-100'
//                   onClick={
//                   ()=>{
//                       const filteredList=listOfRestaurants.filter(
//                         res=> res.info.avgRating>4
//                       );
//                       setFilteredRestaurant(filteredList);
//                   }}
//                 >
//                   Top Rated Restaurants
//                 </button>
//               </div>
//               <div className='search m-2 p-2 flex items-center'>
//                 <label>UserName :</label>

//                 <input value={loggedInUser} className='border border-black mx-2 px-2' onChange={(e)=>setUserName(e.target.value)} />
//               </div>
              
//           </div>
//           <div className="flex flex-wrap justify-evenly">
//             {filteredRestaurants.map((restaurant) => (
//                 <Link 
//                   key={restaurant.info.id} 
//                   to={'/restaurants/'+restaurant.info.id}
//                 >
//                   {restaurant.info.avgRating> 4.5 ? (
//                     <RestaurantCardPromoted resData={restaurant}/> 
//                    ) : ( 
//                     <RestaurantCard  resData={restaurant}/>
//                   )}
                  
//                 </Link>
//             ))}
//           </div>
//         </div>
//     )
// };
// export default Body;
