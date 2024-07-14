import React ,{lazy,Suspense} from "react";
import ReactDOM from "react-dom/client";
import Header from './components/Header.js';
import Body from './components/Body.js'
import About from './components/About.js'
import Contact from './components/Contact.js'
import Error from './components/Error.js'
import {createBrowserRouter,RouterProvider, Outlet} from 'react-router-dom'
import RestaurantMenu from "./components/RestaurantMenu.js";
import { useParams } from "react-router-dom";
import {useState,useEffect} from 'react'
import Shimmer from './components/Shimmer.js'
import UserContext from "../utils/UserContext.js";
const Grocery=lazy(()=>import("./components/Grocery.js"))
import {Provider} from 'react-redux'
import appStore from '../utils/appStore.js'
import Cart from './components/Cart.js'
//component composition
const AppLayout = () => {
  const {link}=useParams();
  // console.log(link);
  const [userName,setUserName]=useState();
  useEffect(()=>{
    const data={
      name:""
    }
    setUserName(data.name)
  },[])

  return (//this is the default layout
    <Provider store={appStore}>
    <UserContext.Provider value={{loggedInUser : userName,setUserName}}>
      <div className="app">
        <Header/>
        <Outlet/>
      </div>
    </UserContext.Provider>
    </Provider>
  );
};

const browserRouter=createBrowserRouter([
  {
    path:'/',
    element: <AppLayout/>,
    children:[
      {
        path: '/',
        element: <Body/>
      },
      {
        path: '/about',
        element: <About/>
      },
      {
        path: '/contact',
        element: <Contact/>
      },
      {
        path: '/restaurants/:resId',
        element : <RestaurantMenu  />
      },
      {
        path:"/cart",
        element:<Cart/>
      }
    ],
    errorElement: <Error/>,
  },
  {
    path:'/grocery',
    element:<Suspense  fallback={<Shimmer/>}  ><Grocery/></Suspense>,
    errorElement:<Error/>
  }
  
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={browserRouter}/>);
